import React, { useState, useEffect } from "react";
import { Fetcher } from '../../../common';
import { useBranches } from "../../../contexts/BranchesContext";
import { useCurrencies } from '../../../contexts/CurrenciesContext';

const AssetQuality = () => {
    const [currencyId, setCurrencyID] = useState(null);
    const [urls, setUrls] = useState([]);

    const {branches} = useBranches();
    const {currencies} = useCurrencies();

    useEffect(() => {

    }, []);

    // const parUrls = [
    //     '/reportsapi/par-report/?branch_ids=35&branch_ids=44&branch_ids=45&currency_id=42&lower_limit=1&upper_limit=30'
    // ];

    return (
        <Fetcher urls={urls}>
            {({data}) => (
                <div>{JSON.stringify(data)}</div>
            )}
        </Fetcher>
    )
}

export default AssetQuality