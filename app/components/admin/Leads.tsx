"use client";
import Image from "next/image";
import styles from "../../admin/Admin.module.css";
import { useState } from "react";
import Select, { SingleValue } from 'react-select'

import { useAppDispatch, useAppSelector } from "@/lib/hooks";

import {
    selectData,
    selectStatus,
    markReachedOut,
    SingleUser
  } from "@/lib/features/userdata/userdataSlice";

export const Leads = () => {
    const statusOptions = [
        { "label": "Pending", "value": "PENDING" },
        { "label": "Reached Out", "value": "REACHED_OUT" }
    ]
    const [search, setSearch] = useState<string>("");

    const data = useAppSelector(selectData);
    // Clone one for sorting
    let localData = JSON.parse(JSON.stringify(data));

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const target = event.target;
        setSearch(target.value);
    };

    const dispatch = useAppDispatch();
    let currentSort = 'default';
    let currentSorting = 'asc';
    const reachedOut = (x:any) => {
        dispatch(markReachedOut(x));
        localData = JSON.parse(JSON.stringify(data));
        setRows(createRows(localData))
    }

    const createRows = (data:any) => {
        return (data.map( (x: any) => <>
            <tr>
                <td>{x.first_name} {x.last_name}</td>
                <td>{x.submitted}</td>
                <td>{x.status}</td>
                <td>{x.country}</td>
                {x.status == "PENDING" ? <td><button className={styles.btn} onClick={() => {reachedOut(x)}}>Reached out</button></td> : <td>-</td>}
            </tr>
        </>))
    }
    const [rows, setRows] = useState(createRows(localData));
    const sortby = (sortCol: string) => {
        localData = localData.sort((a:any,b:any) => a[sortCol] > b[sortCol] ? 1 : -1);
        if (currentSort == sortCol && currentSorting == 'desc') {
            // Flip sorting
            localData.reverse();
            currentSorting = 'asc';
        }
        else {
            currentSorting = 'desc';
        }
        currentSort = sortCol;
        setRows(createRows(localData));
    }

    return (
        <div className={styles.mainContainer}>
            <h1 className={styles.title}>Leads</h1>
            <div className={styles.searchBarWrapper}>
                <div className={styles.inputWithIcon}>
                    <Image
                        src="/search.svg"
                        height={16}
                        width={16}
                        className={styles.inputIcon}
                        alt="search icon"
                    />
                    <input type="text" name="searchBar" id="searchBar" value={search} onChange={handleInputChange} className={styles.searchBar} placeholder="Search" />
                </div>
                <Select
                    options={statusOptions}
                    placeholder="Status"
                    className="countries-select-container status-search"
                    classNamePrefix="countries-select"
                    unstyled
                    name="country"
                // onChange={(value) => handleSelect(value)}
                />
            </div>
            <table className="datatable">
                <thead>
                    <tr>
                        <th onClick={sortby('name')}>Name</th>
                        <th onClick={sortby('date')}>Submitted</th>
                        <th onClick={sortby('status')}>Status</th>
                        <th onClick={sortby('country')}>Country</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>{rows}</tbody>
                <tfoot>
                    <tr>
                        <td colSpan={5}>
                            {/* Pagination */}
                            <div className="pagination">
                                <button className="pagination-button disabled" disabled><Image src="/chevron-left.svg" height={14} width={9} alt="previous" /></button>
                                <button className="pagination-button active-button">1</button>
                                <button className="pagination-button">2</button>
                                <button className="pagination-button">3</button>
                                <button className="pagination-button"><Image src="/chevron-left.svg" height={14} width={9} alt="next" className="next" /></button>
                            </div>                           
                        </td>
                    </tr>
                </tfoot>
            </table>
        </div>
    )
}