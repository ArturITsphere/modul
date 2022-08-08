"use strict";

const productFilter = document.forms['product-filter'];
if (productFilter) {
    productFilter.addEventListener("change", processFiltering);
}

function processFiltering(a){
    const filterForm = document.forms['product-filter'];

    let filteredItems = items;

    // Price
    const priceFrom = Number(filterForm.elements['priceFrom'].value);
    if (Number.isInteger(priceFrom) && priceFrom > 0) {
        filteredItems = filteredItems.filter(function(item){
            return priceFrom <= item.price;
        });
    }

    const priceTo = Number(filterForm.elements['priceTo'].value);
    if (Number.isInteger(priceTo) && priceTo > 0) {
        filteredItems = filteredItems.filter(function(item){
            return item.price <= priceTo;
        });
    }    

    // Colors
    const colorOptions = { 
        'color-red': 'Red',
        'color-green': 'Green',
        'color-black': 'Black',
        'color-white': 'White',
        'color-blue': 'Blue',
        'color-grey': 'Grey',
        'color-gold': 'Gold',
        'color-yellow': 'Yellow'
    };
    
    const colorFilters = [];

    for (const [key, value] of Object.entries(colorOptions)) {
        if (filterForm.querySelector(`input#${key}`).checked) {
            colorFilters.push(value);
        }
    }

    if (colorFilters.length > 0) {
        
        filteredItems = filteredItems.filter(function(item){
            let exists = false;
            
            for (const filter of colorFilters) {
                exists = item.color.some(function(color){
                    return color.includes(filter);
                });
            
                if (exists)
                    break;
            }

            return exists;
        });
    }

    const memoryOptions = {
        'ram-32gb': 32,
        'ram-64gb': 64,
        'ram-128gb': 128,
        'ram-256gb': 256,
        'ram-512gb': 512,
        'ram-1tb': 1,
        'ram-2tb': 2,
        'ram-4tb': 4,
    };
    const memoryFilters = [];

    // Memory
    for (const [key, value] of Object.entries(memoryOptions)) {
        if (filterForm.querySelector(`input#${key}`).checked) {
            memoryFilters.push(value);
        }
    }
    
    if (memoryFilters.length > 0) {
        filteredItems = filteredItems.filter(function(item){
            let exists = false;
            
            for (const filter of memoryFilters) {
                exists = [item.ram, item.storage].some(function(i){
                    return i == filter;
                });
            
                if (exists)
                    break;
            }

            return exists;
        });
    }

    // OS
    const osOptions = {
        'os-ios': 'IOS',
        'os-macos': 'macOS',
	    'os-tvos': 'tvOS',
        'os-watchos': 'WatchOS'
    };

    const osFilters = [];
    for (const [key, value] of Object.entries(osOptions)) {
        if (filterForm.querySelector(`input#${key}`).checked) {
            osFilters.push(value);
        }
    }

    if (osFilters.length > 0) {
        filteredItems = filteredItems.filter(function(item){
            let exists = osFilters.some(function(filter) {
                return item.os !== null && item.os.toLowerCase() === filter.toLowerCase();
            });

            return exists;
        });
    }

    // Display
    const displayOptions = {
        'display-2-5-inch': [2, 5],
        'display-5-7-inch': [5, 7],
        'display-7-12-inch': [7, 12],
        'display-12-16-inch': [12, 16]
    };

    const displayFilters = [];
    for (const [key, value] of Object.entries(displayOptions)) {
        if (filterForm.querySelector(`input#${key}`).checked) {
            displayFilters.push(value);
        }
    }

    if (displayFilters.length > 0) {
        filteredItems = filteredItems.filter(function(item){
            let exists = displayFilters.some(function(filter) {
                return filter[0] <= item.display && item.display <= filter[1];
            });

            return exists;
        });
    }

    console.debug(filteredItems);
    console.debug(`Total number of filtered items are: ${filteredItems.length}`);

    for (const item of items)
    {
        const exist = filteredItems.length === 0 || filteredItems.some(function(fi){
            return fi.id === item.id;
        });

        var productElement = document.querySelector(`div[data-product-id='${item.id}']`);

        if (exist) {
            productElement.style.display = "inline-block";
            productElement.style.visibility = 'visible';
            
        } else {
            productElement.style.display = "none";
            productElement.style.visibility = 'hidden';
        }
    }
}