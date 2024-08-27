"use client";
import Image from "next/image";
import styles from "../../admin/Admin.module.css";
import { useState } from "react";
import Select, { SingleValue } from 'react-select'

export const Leads = () => {
    const statusOptions = [
        { "label": "Pending", "value": "PENDING" },
        { "label": "Reached Out", "value": "REACHED_OUT" }
    ]
    const [search, setSearch] = useState<string>("");

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const target = event.target;
        setSearch(target.value);
    };

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
                        <th>Name</th>
                        <th>Submitted</th>
                        <th>Status</th>
                        <th>Country</th>
                    </tr>
                </thead>
                <tbody></tbody>
                <tfoot>
                    <tr>
                        <td colSpan={4}>
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