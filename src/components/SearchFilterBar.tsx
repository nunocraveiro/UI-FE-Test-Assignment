import { useRef, KeyboardEvent, MouseEvent, useState } from 'react';
import './SearchFilterBar.css';
import search from '../assets/Search-icon.svg';
import clear from '../assets/clear.svg';
import closeFilter from '../assets/close.svg';
import listToggleDefault from '../assets/list-default.svg';
import listToggleActive from '../assets/list-active.svg';
import gridToggleDefault from '../assets/grid-default.svg';
import gridToggleActive from '../assets/grid-active.svg';
import checkboxDefault from '../assets/checkbox-default.svg';
import checkboxChecked from '../assets/checkbox-checked.svg';

type Props = {
    viewToggle: string,
    setViewToggle: (toggle: string) => void,
    devices: any,
    setIsQueryActive: (isActive: boolean) => void,
    queryResult: any,
    setQueryResult: (devicesArr: any) => void
}

const SearchFilterBar = (props: Props) => {
    const searchInput = useRef<HTMLInputElement>(null);
    const [filterActive, setFilterActive] = useState(false);
    const [filteredProductLines, setFilteredProductLines] = useState<string[]>([]);
    const [checkedBoxes, setCheckedBoxes] = useState<string[]>([]);
    const [tempDeviceArr, setTempDeviceArr] = useState<any>([]);

    const searchQueryArr = (query: string) => {
        if (filteredProductLines.length !== 0 && tempDeviceArr.length === 0) {
            return props.queryResult.filter((device: any) => device.product.name.toLowerCase().includes(query) || device.line.name.toLowerCase().includes(query));
        }
        return props.devices.filter((device: any) => device.product.name.toLowerCase().includes(query) || device.line.name.toLowerCase().includes(query));
    }

    const resetElements = () => {
        setCheckedBoxes([]);
        setTempDeviceArr([]);
        setFilteredProductLines([]);
        setFilterActive(false);
    }

    const displaySearchResults = (query: string) => {
        setTempDeviceArr(searchQueryArr(query));
        props.setQueryResult(searchQueryArr(query));
        props.setIsQueryActive(true);
    }

    const triggerSearchInput = (query: string) => {
        if (query === '' && filteredProductLines.length !== 0) {
            resetElements();
            props.setQueryResult([]);
            return props.setIsQueryActive(false);
        }
        if (filteredProductLines.length !== 0) {
            resetElements();
            return displaySearchResults(query.toLowerCase());
        }
        return displaySearchResults(query.toLowerCase());
    }

    const getProductLines = () => {
        const productLinesArr: string[] = [];
        props.devices.forEach((device: any) => {
            if (!productLinesArr.includes(device.line.name)) productLinesArr.push(device.line.name);
        })
        return productLinesArr.sort((a: string, b: string) => {
            a = a.toLowerCase();
            b = b.toLowerCase();
            return a > b ? 1 : (a < b ? -1 : 0);
        });
    }

    const handleClick = (e: MouseEvent<HTMLImageElement>) => {
        e.preventDefault();
        triggerSearchInput(searchInput.current!.value);
    }

    const handleEnter = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            triggerSearchInput(searchInput.current!.value);
        }
    }

    const handleClear = (e: MouseEvent<HTMLImageElement>) => {
        e.preventDefault();
        searchInput.current!.value = '';
        resetElements();
        props.setQueryResult([]);
        props.setIsQueryActive(false);
    }

    const handleFilter = (e: MouseEvent<HTMLParagraphElement>) => {
        e.preventDefault();
        setFilterActive(true);
    }

    const handleFilterClose = (e: MouseEvent<HTMLImageElement>) => {
        e.preventDefault();
        setFilterActive(false);
    }

    const handleCheckbox = (e: MouseEvent<HTMLImageElement>) => {
        e.preventDefault();
        if (!checkedBoxes.includes(e.currentTarget.className)) {
            checkedBoxes.push(e.currentTarget.className);
            setCheckedBoxes(checkedBoxes);
            filteredProductLines.push(e.currentTarget.className);
        }
        else {
            checkedBoxes.splice(checkedBoxes.indexOf(e.currentTarget.className), 1);
            setCheckedBoxes(checkedBoxes);
            filteredProductLines.splice(filteredProductLines.indexOf(e.currentTarget.className), 1);
        }

        // clear filter but still display the search query results
        if (filteredProductLines.length === 0 && tempDeviceArr.length !== 0) {
            return props.setQueryResult(tempDeviceArr);
        }

        // clear filter when the search hasn't been used before
        else if (filteredProductLines.length === 0 && tempDeviceArr.length === 0) {
            return props.setIsQueryActive(false);
        }

        let resultArr: any[] = [];
        setFilteredProductLines(filteredProductLines);

        // filter the search query results
        if (tempDeviceArr.length !== 0) filteredProductLines.forEach((productLine: string) => resultArr = resultArr.concat(tempDeviceArr.filter((device: any) => device.line.name === productLine)));

        // filter all results
        else filteredProductLines.forEach((productLine: string) => resultArr = resultArr.concat(props.devices.filter((device: any) => device.line.name === productLine)));

        // sort filter results alphabetically and case insensitive and assign them to queryResult
        props.setQueryResult(resultArr.sort((a: any, b: any) => {
            a = a.line.name.toLowerCase();
            b = b.line.name.toLowerCase();
            return a > b ? 1 : (a < b ? -1 : 0);
        }));

        props.setIsQueryActive(true);
    }

    const handleViewToggleClick = (e: MouseEvent<HTMLImageElement>) => {
        e.preventDefault();
        if (props.viewToggle === 'list' && e.currentTarget.className === 'gridToggle') {
            props.setViewToggle('grid');
            const sibling = e.currentTarget.previousElementSibling as HTMLImageElement;
            e.currentTarget.src = gridToggleActive;
            return sibling.src = listToggleDefault;
        }
        if (props.viewToggle === 'grid' && e.currentTarget.className === 'listToggle') {
            props.setViewToggle('list');
            const sibling = e.currentTarget.nextElementSibling as HTMLImageElement;
            e.currentTarget.src = listToggleActive;
            return sibling.src = gridToggleDefault;
        }
    }

    return (
        <section className='searchFilterBar'>
            <div className='searchElement'>
                <img className='searchBtn' src={search} alt='search' onClick={handleClick}/>
                <input className='searchInput' type='search' placeholder='Search' ref={searchInput} onKeyDown={handleEnter}/>
                <img className='clearBtn' src={clear} alt='clear' onClick={handleClear}/>
            </div>
            {!filterActive ? <div className='filterElements'>
                <img className='listToggle' src={props.viewToggle === 'list' ? listToggleActive : listToggleDefault} alt='list toggle' onClick={handleViewToggleClick}/>
                <img className='gridToggle' src={props.viewToggle === 'grid' ? gridToggleActive : gridToggleDefault} alt='grid toggle' onClick={handleViewToggleClick}/>
                <p className='filterBtn' onClick={handleFilter}>Filter</p>
            </div> : 
            <div className='filterElements filterActive'>
                <div className='filterHeader'>
                    <p className='filterBtn filterBtnActive' onClick={handleFilter}>Filter</p>
                    <img className='filterClose' src={closeFilter} alt='filter close' onClick={handleFilterClose}/>
                </div>
                <div className='filterBody'>
                    <h3>Product line</h3>
                    {getProductLines().map((productLine: string) => (
                        <div key={productLine}>    
                            <img className={productLine} src={!checkedBoxes.includes(productLine) ? checkboxDefault : checkboxChecked} alt='checkbox defalt' onClick={handleCheckbox}/>
                            <p>{productLine}</p>
                        </div>
                    ))}
                </div>
            </div>}
        </section>
    )
}

export default SearchFilterBar;