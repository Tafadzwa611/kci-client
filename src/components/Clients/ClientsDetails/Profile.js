import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useDropzone } from "react-dropzone";
import axios from "axios";
import Cookies from "js-cookie";
import { Controlled as ControlledZoom } from "react-medium-image-zoom";
import "react-medium-image-zoom/dist/styles.css";

const PLACEHOLDER_PROFILE_LINK =
  "https://cbmstaticfiles.sfo2.cdn.digitaloceanspaces.com/lenda-frontend-files/profile.png";

function Profile({ client, setClient }) {
  const [fileId, setFileId] = useState(null);
  const [progress, setProgress] = useState(null);
  const [isZoomed, setIsZoomed] = useState(false);
  const [imgSrc, setImgSrc] = useState(PLACEHOLDER_PROFILE_LINK);
  const [busy, setBusy] = useState(false);

  const statusClasses = useMemo(
    () => ({
      Active: "badge badge-success",
      Blacklisted: "badge badge-dark",
      Processing: "badge badge-info-lighter",
      "Pending Approval": "badge badge-info-light",
      Inactive: "badge badge-info",
      Left: "badge badge-semi-dark",
      Rejected: "badge badge-danger",
    }),
    []
  );

  const handleZoomChange = useCallback((shouldZoom) => {
    setIsZoomed(shouldZoom);
  }, []);

  const uploadFile = useCallback(
    (blob, url, fileName) =>
      new Promise((res, rej) => {
        const xhr = new XMLHttpRequest();
        xhr.open("PUT", url);

        xhr.onload = () => {
          const postXHR = new XMLHttpRequest();
          postXHR.open("POST", `/clientsapi/add_client_file/${client.id}/`);

          const formData = new FormData();
          formData.append("filename", fileName);
          formData.append("is_profile", "true");
          formData.append("description", "Profile.png");
          formData.append("csrfmiddlewaretoken", Cookies.get("csrftoken"));

          postXHR.onload = () => {
            try {
              const jsonResponse = JSON.parse(postXHR.responseText);
              jsonResponse.name = jsonResponse.filename;

              setFileId(jsonResponse.id);
              setClient((curr) => ({
                ...curr,
                files: [...(curr.files || []), jsonResponse],
              }));

              setProgress(null);
              res(jsonResponse);
            } catch (e) {
              rej(e);
            }
          };

          postXHR.onerror = (evt) => rej(evt);
          postXHR.send(formData);
        };

        xhr.onerror = (evt) => rej(evt);

        xhr.upload.onprogress = (event) => {
          if (event.lengthComputable) {
            const percentage = (event.loaded / event.total) * 100;
            setProgress(Math.round(percentage));
          }
        };

        xhr.send(blob);
      }),
    [client.id, setClient]
  );

  const onDrop = useCallback(
    async (acceptedFiles) => {
      const file = acceptedFiles?.[0];
      if (!file) return;

      setBusy(true);
      setProgress(0);

      const localPreview = URL.createObjectURL(file);
      setImgSrc(localPreview);

      try {
        const resizedBlob = await resizeImageToPngBlob(file, 640);

        const signedUrlResp = await axios.get(
          "/usersapi/get_signed_url/?client_method=put_object&bucket=lenda-client-files"
        );

        await uploadFile(resizedBlob, signedUrlResp.data.url, signedUrlResp.data.filename);
      } catch (err) {
        console.log(err);
        setImgSrc(PLACEHOLDER_PROFILE_LINK);
        setProgress(null);
      } finally {
        setBusy(false);
        URL.revokeObjectURL(localPreview);
      }
    },
    [uploadFile]
  );

  const { getRootProps, getInputProps, open } = useDropzone({
    maxFiles: 1,
    accept: { "image/*": [] },
    noClick: true, // image tap = view only
    onDrop,
  });

  useEffect(() => {
    const getPhoto = async () => {
      const profile = (client.files || []).find((f) => f.is_profile);

      if (!profile) {
        setFileId(null);
        setImgSrc(PLACEHOLDER_PROFILE_LINK);
        return;
      }

      try {
        const response = await axios.get(
          `/usersapi/get_signed_url/?client_method=get_object&bucket=lenda-client-files&filename=${encodeURIComponent(
            profile.name
          )}`
        );
        setFileId(profile.id);
        setImgSrc(response.data.url);
      } catch (err) {
        console.log(err);
        setFileId(profile.id);
        setImgSrc(PLACEHOLDER_PROFILE_LINK);
      }
    };

    getPhoto();
  }, [client.files]);

  const deleteFile = useCallback(async () => {
    if (!fileId) return;

    const CONFIG = {
      headers: {
        "X-CSRFToken": Cookies.get("csrftoken"),
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    };

    try {
      setBusy(true);
      await axios.delete(`/clientsapi/delete_file/${fileId}/`, CONFIG);

      setClient((curr) => ({
        ...curr,
        files: (curr.files || []).filter((f) => f.id !== fileId),
      }));

      setFileId(null);
      setImgSrc(PLACEHOLDER_PROFILE_LINK);
    } catch (error) {
      console.log(error);
    } finally {
      setBusy(false);
    }
  }, [fileId, setClient]);

  return (
    <section>
      {/* Theme variables + component styles */}
      <style>{`
        /* Light theme defaults */
        :root {
          --pf-card-bg: #ffffff;
          --pf-card-border: rgba(0,0,0,0.08);
          --pf-text: rgba(0,0,0,0.88);
          --pf-muted: rgba(0,0,0,0.60);
          --pf-ring-bg1: rgba(0,0,0,0.15);
          --pf-ring-bg2: rgba(0,0,0,0.05);
          --pf-img-bg: #f4f4f4;
          --pf-overlay: rgba(0,0,0,0.35);
          --pf-overlay-bar: rgba(255,255,255,0.30);
          --pf-overlay-bar-fill: rgba(255,255,255,0.95);
          --pf-btn-border: rgba(0,0,0,0.10);
        }

        /* Dark theme (supports both patterns) */
        html[data-theme="dark"], body[data-theme="dark"], body.dark {
          --pf-card-bg: rgba(18,18,18,0.90);
          --pf-card-border: rgba(255,255,255,0.10);
          --pf-text: rgba(255,255,255,0.92);
          --pf-muted: rgba(255,255,255,0.70);
          --pf-ring-bg1: rgba(255,255,255,0.18);
          --pf-ring-bg2: rgba(255,255,255,0.08);
          --pf-img-bg: rgba(255,255,255,0.06);
          --pf-overlay: rgba(0,0,0,0.55);
          --pf-overlay-bar: rgba(255,255,255,0.20);
          --pf-overlay-bar-fill: rgba(255,255,255,0.90);
          --pf-btn-border: rgba(255,255,255,0.16);
        }

        /* Responsive: switch to row layout on wider screens */
        @media (min-width: 640px) {
          .pf-wrapper { flex-direction: row !important; align-items: center !important; text-align: left !important; }
          .pf-info { align-items: flex-start !important; text-align: left !important; }
          .pf-nameRow { justify-content: flex-start !important; }
          .pf-actions { justify-content: flex-start !important; }
        }
      `}</style>

      <div {...getRootProps()} className="pf-wrapper" style={styles.wrapper}>
        <input {...getInputProps()} />

        {/* Avatar */}
        <div style={styles.avatarBlock}>
          <div style={styles.avatarRing}>
            <ControlledZoom isZoomed={isZoomed} onZoomChange={handleZoomChange}>
              <img src={imgSrc} alt="Client profile" style={styles.avatarImg} />
            </ControlledZoom>

            {progress !== null && (
              <div style={styles.progressOverlay}>
                <div style={styles.progressText}>{progress}%</div>
                <div style={styles.progressBarOuter}>
                  <div style={{ ...styles.progressBarInner, width: `${progress}%` }} />
                </div>
              </div>
            )}
          </div>

          <div style={styles.avatarHint}>Tap to view</div>
        </div>

        {/* Info */}
        <div className="pf-info" style={styles.infoBlock}>
          <div className="pf-nameRow" style={styles.nameRow}>
            <div style={styles.name}>
              {client.first_name} {client.last_name}
            </div>
            <span className={statusClasses[client.status]} style={styles.statusPill}>
              {client.status}
            </span>
          </div>

          <div className="pf-actions" style={styles.actionsRow}>
            <button
              type="button"
              className="badge badge-default"
              style={styles.btn}
              onClick={() => open()}
              disabled={busy}
            >
              Change Photo
            </button>

            {fileId && (
              <button
                type="button"
                className="badge badge-default"
                style={{ ...styles.btn, ...styles.dangerBtn }}
                onClick={deleteFile}
                disabled={busy}
              >
                Remove
              </button>
            )}
          </div>

          <div style={styles.helperText}>
            Tap the image to zoom. Use “Change Photo” to upload a new profile picture.
          </div>
        </div>
      </div>
    </section>
  );
}

/** --- helpers --- */
async function resizeImageToPngBlob(file, maxWidth = 640) {
  const dataUrl = await fileToDataURL(file);
  const img = await loadImage(dataUrl);

  const width = Math.min(maxWidth, img.width);
  const scale = width / img.width;
  const height = Math.round(img.height * scale);

  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;

  const ctx = canvas.getContext("2d");
  ctx.drawImage(img, 0, 0, width, height);

  const pngDataUrl = canvas.toDataURL("image/png");
  return await dataURItoBlob(pngDataUrl);
}

function fileToDataURL(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

function loadImage(src) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  });
}

async function dataURItoBlob(dataURI) {
  const response = await fetch(dataURI);
  const blob = await response.blob();
  return blob;
}

/** --- styles (theme-aware via CSS vars) --- */
const styles = {
  wrapper: {
    display: "flex",
    gap: 12,
    alignItems: "center",
    padding: 12,
    borderRadius: 14,
    border: "1px solid var(--pf-card-border)",
    background: "var(--pf-card-bg)",
    color: "var(--pf-text)",
    flexDirection: "column",
  },

  avatarBlock: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 6,
  },

  avatarRing: {
    width: 112,
    height: 112,
    borderRadius: 999,
    padding: 3,
    background: "linear-gradient(135deg, var(--pf-ring-bg1), var(--pf-ring-bg2))",
    position: "relative",
  },

  avatarImg: {
    width: "100%",
    height: "100%",
    borderRadius: 999,
    objectFit: "cover",
    background: "var(--pf-img-bg)",
    display: "block",
  },

  avatarHint: {
    fontSize: 12,
    color: "var(--pf-muted)",
  },

  infoBlock: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    gap: 10,
    alignItems: "center",
    textAlign: "center",
  },

  nameRow: {
    display: "flex",
    gap: 10,
    alignItems: "center",
    flexWrap: "wrap",
    justifyContent: "center",
  },

  name: {
    fontWeight: 800,
    fontSize: 16,
    lineHeight: "20px",
  },

  statusPill: {
    borderRadius: 999,
    padding: "6px 10px",
    fontSize: 12,
  },

  actionsRow: {
    display: "flex",
    gap: 8,
    flexWrap: "wrap",
    justifyContent: "center",
  },

  btn: {
    padding: "10px 12px",
    borderRadius: 10,
    border: "1px solid var(--pf-btn-border)",
    cursor: "pointer",
    minWidth: 120,
    background: "transparent",
    color: "inherit",
  },

  dangerBtn: {
    opacity: 0.95,
  },

  helperText: {
    fontSize: 12,
    color: "var(--pf-muted)",
    maxWidth: 420,
  },

  progressOverlay: {
    position: "absolute",
    left: 0,
    top: 0,
    right: 0,
    bottom: 0,
    borderRadius: 999,
    background: "var(--pf-overlay)",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
    color: "#fff",
    padding: 10,
  },

  progressText: {
    fontWeight: 800,
    fontSize: 14,
  },

  progressBarOuter: {
    width: "80%",
    height: 8,
    borderRadius: 999,
    background: "var(--pf-overlay-bar)",
    overflow: "hidden",
  },

  progressBarInner: {
    height: "100%",
    borderRadius: 999,
    background: "var(--pf-overlay-bar-fill)",
  },
};

export default Profile;
