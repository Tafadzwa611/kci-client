import React from "react";
import { Form, Formik } from "formik";
import axios from "axios";
import {
  NonFieldErrors,
  CustomDatePickerFilter,
  CustomSelectFilter,
  SubmitButtonFilter,
} from "../../../common";
import { useCurrencies } from "../../../contexts/CurrenciesContext";
import { removeEmptyValues, getParams } from "../../../utils/utils";

const Filter = ({ setTransferData, setParams, transferTypes}) => {
    const initialValues = {
        page_num: 1,
        min_date_created: "",
        max_date_created: "",
        transfer_type_id: "",
        currency_id: "",
    };

    const { currencies } = useCurrencies();

    const onSubmit = async (values, actions) => {
        try {
        const data = removeEmptyValues(values);
        const params = getParams(data);

        setParams(params);

        const response = await axios.get("/acc-api/transfers-list/", { params });
        setTransferData(response.data);

        } catch (error) {
        if (error.message === "Network Error") {
            actions.setErrors({ responseStatus: "Network Error" });
        } else if (error.response?.status >= 400 && error.response?.status < 500) {
            actions.setErrors({
            responseStatus: error.response.status,
            ...(error.response.data || {}),
            });
        } else {
            actions.setErrors({ responseStatus: error.response?.status });
        }
        }
    };

    return (
        <Formik initialValues={initialValues} onSubmit={onSubmit}>
        {({ isSubmitting, setFieldValue, errors }) => (
            <div className="search_background">
            <div className="row-containers" style={{ border: "none" }}>
                <Form>
                <NonFieldErrors errors={errors}>
                    {/* Row 1: Date range */}
                    <div
                    className="row row-payments row-loans"
                    style={{ marginTop: "1rem" }}
                    >
                    <div className="row-payments-container" style={{ width: "32%" }}>
                        <CustomDatePickerFilter
                        label="Min Date Created"
                        name="min_date_created"
                        setFieldValue={setFieldValue}
                        required
                        />
                    </div>

                    <div className="row-payments-container" style={{ width: "32%" }}>
                        <CustomDatePickerFilter
                        label="Max Date Created"
                        name="max_date_created"
                        setFieldValue={setFieldValue}
                        required
                        />
                    </div>

                    <div className="row-payments-container" style={{ width: "32%" }}>
                        <CustomSelectFilter label="Transfer Type" name="transfer_type_id" required>
                        <option value="">------</option>
                        {transferTypes.tranfertypes.map((tt) => (
                            <option key={tt.id} value={tt.id}>
                            {tt.name}
                            </option>
                        ))}
                        </CustomSelectFilter>
                    </div>
                    </div>

                    {/* Row 2: currency + submit */}
                    <div
                        style={{
                            marginTop: "1rem",
                            display: "flex",
                            justifyContent: "space-between",
                            gap: "1rem",
                        }}
                        >
                        <div style={{ width: "88%" }}>
                            <CustomSelectFilter label="Currency" name="currency_id" required>
                            <option value="">------</option>
                            {currencies.map((currency) => (
                                <option key={currency.id} value={currency.id}>
                                {currency.fullname}
                                </option>
                            ))}
                            </CustomSelectFilter>
                        </div>

                        <div style={{ width: "10%" }}>
                            <SubmitButtonFilter isSubmitting={isSubmitting} />
                        </div>
                    </div>
                </NonFieldErrors>
                </Form>
            </div>
            </div>
        )}
        </Formik>
    );
};

export default Filter;
