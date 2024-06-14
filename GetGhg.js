
class GetGhg {
    constructor(svg, data, config) {
        this.svg = svg;
        this.dataFull = data;
        this.data = this.dataFull.slice(0, 20);
        this.config = config;
        this.settings = this.config.settings;
        
        this.previousOrder = this.data.map(d => d.yPositionDefault);
        this.selectedRow = [];
        this.rowOrder = this.createRowOrder(this.selectedRow, this.data.length);
        this.scalingRows = this.createScalingFunction([0, this.dataFull.length + 1], [10, 945]);
        
        this.initSvgGroups();
        
        this.go();
    }
    
    updateData(numRows) {
        this.data = this.dataFull.slice(0, numRows);
        this.clearSVG();
        this.go();
    }
    
    clearSVG() {
        this.svgG.selectAll("*").remove();
    }
    
    go() {   
        this.initSvgGroups();
        this.initHc();
        this.initHcGHG({hasExpand: true,  nameShort: 'hcC',   name: 'co2total'});
        this.initHcGHG({hasExpand: true,  nameShort: 'hcM',   name: 'ch4total'});
        this.initHcGHG({hasExpand: true,  nameShort: 'hcN',   name: 'n2ototal'});
        this.initHcGHG({hasExpand: false, nameShort: 'hcCc',  name: 'co2coal'});
        this.initHcGHG({hasExpand: false, nameShort: 'hcCo',  name: 'co2oil'});
        this.initHcGHG({hasExpand: false, nameShort: 'hcCg',  name: 'co2gas'});
        this.initHcGHG({hasExpand: false, nameShort: 'hcCl',  name: 'co2lu'});
        this.initHcGHG({hasExpand: false, nameShort: 'hcCt',  name: 'co2other'});
        this.initHcGHG({hasExpand: false, nameShort: 'hcMcp', name: 'ch4cropproduction'});
        this.initHcGHG({hasExpand: false, nameShort: 'hcMfc', name: 'ch4fuelcombustion'});
        this.initHcGHG({hasExpand: false, nameShort: 'hcMfe', name: 'ch4fugitiveemissions'});
        this.initHcGHG({hasExpand: false, nameShort: 'hcMli', name: 'ch4livestock'});
        this.initHcGHG({hasExpand: false, nameShort: 'hcMwa', name: 'ch4other'});
        this.initHcGHG({hasExpand: false, nameShort: 'hcMot', name: 'ch4waste'});
        this.initHcGHG({hasExpand: false, nameShort: 'hcNa',  name: 'n2oagriculture'});
        this.initHcGHG({hasExpand: false, nameShort: 'hcNe',  name: 'n2oenergy'});
        this.initHcGHG({hasExpand: false, nameShort: 'hcNi',  name: 'n2oindustry'});
        this.initHcGHG({hasExpand: false, nameShort: 'hcNo',  name: 'n2oother'});
        this.initHcGHG({hasExpand: false, nameShort: 'hcNw',  name: 'n2owaste'});
        this.initLe();
        this.initLeGHG({hasExpand: true,  nameShort: 'leC',   name: 'co2total'});
        this.initLeGHG({hasExpand: true,  nameShort: 'leM',   name: 'ch4total'});
        this.initLeGHG({hasExpand: true,  nameShort: 'leN',   name: 'n2ototal'});
        this.initLeGHG({hasExpand: false, nameShort: 'leCc',  name: 'co2coal'});
        this.initLeGHG({hasExpand: false, nameShort: 'leCo',  name: 'co2oil'});
        this.initLeGHG({hasExpand: false, nameShort: 'leCg',  name: 'co2gas'});
        this.initLeGHG({hasExpand: false, nameShort: 'leCl',  name: 'co2lu'});
        this.initLeGHG({hasExpand: false, nameShort: 'leCt',  name: 'co2other'});
        this.initLeGHG({hasExpand: false, nameShort: 'leMcp', name: 'ch4cropproduction'});
        this.initLeGHG({hasExpand: false, nameShort: 'leMfc', name: 'ch4fuelcombustion'});
        this.initLeGHG({hasExpand: false, nameShort: 'leMfe', name: 'ch4fugitiveemissions'});
        this.initLeGHG({hasExpand: false, nameShort: 'leMli', name: 'ch4livestock'});
        this.initLeGHG({hasExpand: false, nameShort: 'leMwa', name: 'ch4other'});
        this.initLeGHG({hasExpand: false, nameShort: 'leMot', name: 'ch4waste'});
        this.initLeGHG({hasExpand: false, nameShort: 'leNa',  name: 'n2oagriculture'});
        this.initLeGHG({hasExpand: false, nameShort: 'leNe',  name: 'n2oenergy'});
        this.initLeGHG({hasExpand: false, nameShort: 'leNi',  name: 'n2oindustry'});
        this.initLeGHG({hasExpand: false, nameShort: 'leNo',  name: 'n2oother'});
        this.initLeGHG({hasExpand: false, nameShort: 'leNw',  name: 'n2owaste'});
        this.initPc();
        this.initTitles();

        const hcGHGConfigs = [
            {nameShort: 'hcC',   xTranslate: 90},
            {nameShort: 'hcM',   xTranslate: 70},
            {nameShort: 'hcN',   xTranslate: 50},
            {nameShort: 'hcCc',  xTranslate: 90},
            {nameShort: 'hcCo',  xTranslate: 90},
            {nameShort: 'hcCg',  xTranslate: 90},
            {nameShort: 'hcCl',  xTranslate: 90},
            {nameShort: 'hcCt',  xTranslate: 90},
            {nameShort: 'hcMcp', xTranslate: 90},
            {nameShort: 'hcMfc', xTranslate: 90},
            {nameShort: 'hcMfe', xTranslate: 90},
            {nameShort: 'hcMli', xTranslate: 90},
            {nameShort: 'hcMwa', xTranslate: 90},
            {nameShort: 'hcMot', xTranslate: 90},
            {nameShort: 'hcNa',  xTranslate: 90},
            {nameShort: 'hcNe',  xTranslate: 90},
            {nameShort: 'hcNi',  xTranslate: 90},
            {nameShort: 'hcNo',  xTranslate: 90},
            {nameShort: 'hcNw',  xTranslate: 90},
            
            {nameShort: 'leC',   xTranslate: 90},
            {nameShort: 'leM',   xTranslate: 70},
            {nameShort: 'leN',   xTranslate: 50},
            {nameShort: 'leCc',  xTranslate: 90},
            {nameShort: 'leCo',  xTranslate: 90},
            {nameShort: 'leCg',  xTranslate: 90},
            {nameShort: 'leCl',  xTranslate: 90},
            {nameShort: 'leCt',  xTranslate: 90},
            {nameShort: 'leMcp', xTranslate: 90},
            {nameShort: 'leMfc', xTranslate: 90},
            {nameShort: 'leMfe', xTranslate: 90},
            {nameShort: 'leMli', xTranslate: 90},
            {nameShort: 'leMwa', xTranslate: 90},
            {nameShort: 'leMot', xTranslate: 90},
            {nameShort: 'leNa',  xTranslate: 90},
            {nameShort: 'leNe',  xTranslate: 90},
            {nameShort: 'leNi',  xTranslate: 90},
            {nameShort: 'leNo',  xTranslate: 90},
            {nameShort: 'leNw',  xTranslate: 90},
        ];

        this.createTransitionMethodsForHcGHG(hcGHGConfigs);
        
        // Call all Hide and HidePercentage methods with duration 0
        hcGHGConfigs.forEach(hcGHG => {
            this[`${hcGHG.nameShort}Hide`]({ duration: 0 });
            this[`${hcGHG.nameShort}HidePercentage`]({ duration: 0 });
        });
    }
    
    //rowsUpdate() {
    //  
    //    const maxSelectedRow = Math.max(...this.selectedRow);
//
    //    this.rows.transition()
    //        .duration(100)
    //        //.style("opacity", (d, i) => this.selectedRow.includes(d.yPositionDefault) || d.yPositionDefault === 0 ? 1 : 0.3)
    //        .style("opacity", (d, i) => this.selectedRow.includes(i + 1) || i + 1 === 0 ? 1 : 0.3)
    //        .transition()
    //        .duration(800)
    //        .attr("transform", (d, i) => `translate(0, ${this.scalingRows(this.rowOrder.indexOf(i + 1))})`)
    //        //.attr("transform", (d, i) => `translate(0, ${this.scalingRows(this.rowOrder.indexOf(d.yPositionDefault))})`)
    //        .transition()
    //        .duration(100)
    //        .style("opacity", 1);
    //}
    
    createRowOrder(selectedRows, totalRows) {
        const remainingRows = Array.from({ length: totalRows }, (_, i) => i).filter(i => i !== 0 && !selectedRows.includes(i));
        return [0, ...selectedRows.filter(i => i !== 0), ...remainingRows];
    }

    createScalingFunction(domain, range) {
        return d3.scaleLinear()
                 .domain(domain)
                 .range(range);
    }
    
    initSvgGroups() {
        this.svgG = this.svg.append('g').attr('id', this.config.id);
        this.svgGHeader = this.svgG.append('g').attr('id', "svgHeader");
        this.svgGRows = this.svgG.append('g').attr('id', "svgRows");
        this.svgGIntro = this.svgG.append('g'). attr('id', "svgIntro")
        
        this.rows = this.svgGRows
            .selectAll("g")
            .data(this.data)
            .enter()
            .append("g")
            .attr("transform", d => `translate(0, ${d.yOffsetDefault})`);
    }
    
    initTitles() {
        this.titles = this.rows
            .append("g")
            .attr('id', "titles")
            .attr('class', 'font-text')
            .selectAll("text")
            .data((d) => d.title) //.map(title => ({ title, yPositionDefault: d.yPositionDefault })))
            .enter()
            .append("text")
            .text((d) => d.title)
            .attr("x", (d) => d.x)
            .attr("y", (d) => d.y)
            // .attr("fill", this.settings.titlesFontFill) // fill in style.css
            .style("font-size", this.settings.titlesFontSize);
            //.on("click", (event, d) => {
            //    const yPositionDefault = d.i; // this.data[d.i].yPositionDefault;
            //    const index = this.selectedRow.indexOf(yPositionDefault);
            //    if (index === -1) {
            //        this.selectedRow.push(yPositionDefault);
            //    } else {
            //        this.selectedRow.splice(index, 1);
            //    }
            //    this.rowOrder = this.createRowOrder(this.selectedRow, this.data.length);
            //    this.rowsUpdate();
            //    
            //    d3.select(event.target).style("font-weight", this.selectedRow.includes(yPositionDefault) ? "bold" : "normal");
//
            //});
    }

    initHc({showHeader = true, showPercent = true} = {}) {
        
        if (showHeader) {
            this.hcHeader = this.svgGHeader
                .append("g")
                .attr('id', 'hc-header')
                .attr('class', 'hc-group');
            
            this.hcHeaderTitle = this.hcHeader
                .append('g')
                .attr('id', 'hc-header-title')
                .attr('class', 'hc-group font-text')
                .append("text")
                //.text(this.settings.hcHeaderTitle + ' ' + this.settings.hcHeaderSymbol0)
                .attr("x", this.settings.hcHeaderTitleX)
                .attr("y", this.settings.hcHeaderExpandY)
                .style("alignment-baseline", 'middle')
                .style("text-anchor", (d) => 'middle')
                .style("font-size", this.settings.headerTitleFontSize)
                .on("click", () => this.hcExpand());
            
            this.hcHeaderTitle
                .append('tspan')
                .text(this.settings.hcHeaderTitle + ' ');
    
            this.hcHeaderTitleSymbol = this.hcHeaderTitle.append('tspan')
                .attr('class', 'fas') // Font Awesome class
                .text(this.settings.hcHeaderSymbol0);
            
            this.hcHeaderExpanded = false;
        }
        
        if (showPercent) {
            this.hcPercentBar = this.rows
                .append("g")
                .attr('id', "hc-percent-bar")
                .attr('class', 'hc-group')
                .selectAll("rect")
                .data((d) => d.hcPercentBar)
                .enter()
                .append("rect")
                .attr("x", (d) => d.x)
                .attr("width", (d) => d.w)
                .attr("rx", this.settings.hcPercentBarRx)
                .attr("y", this.settings.hcPercentBarY)
                .attr("height", this.settings.hcPercentBarH)
                .attr("ry", this.settings.hcPercentBarRy)
                .attr("fill", this.settings.hcPercentBarFill)
                .attr("stroke", "none");
            
            this.hcPercentText = this.rows
                .append("g")
                .attr('id', "hc-percent-text")
                .attr('class', 'hc-group font-number')
                .selectAll("text")
                .data((d) => d.hcTextPercent)
                .enter()
                .append("text")
                .text((d) => d.text)
                .attr("x", (d) => d.x)
                .attr("y", 4.2)
                .attr("fill", this.settings.hcPercentTextFill)
                .style("opacity", this.settings.hcPercentTextO1)
                .style("text-anchor", (d) => 'end')
                .style("font-size", this.settings.hcPercentTextFontSize);
        }
        
        // Define the gradient
        this.defs = this.svg.append("defs");
        
        this.gradient = this.defs.append("linearGradient")
          .attr("id", "hcAreaOpacityGradient")
          .attr("x1", "0%")
          .attr("x2", "100%")
          .attr("y1", "0%")
          .attr("y2", "0%");
        
        // Define the stops for the gradient
        this.gradient.append("stop")
          .attr("offset", "0%")
          .attr("stop-color", "steelblue")
          .attr("stop-opacity", 0.1);
          
        this.gradient.append("stop")
          .attr("offset", "100%")
          .attr("stop-color", "#343434")
          .attr("stop-opacity", 0.4);
          
        this.hcArea = this.rows
            .append("g")
            .attr('id', "hc-area")
            .attr('class', 'hc-group')
            .append("path")
            .datum((d) => d.hcArea)
            .attr("d", this.hcAreaGenerator())
            .attr("fill", "url(#hcAreaOpacityGradient)")
            //.attr("fill", "steelblue") // "rgb(134, 134, 134)")
            .attr("stroke", "rgb(98, 98, 98)")
            .attr("stroke-width", 0)
            .style("opacity", 0.6);
        
        this.hcTotal = this.rows
            .append("g")
            .attr('id', "hc-total")
            .attr('class', 'hc-group font-number')
            .selectAll("text")
            .data((d) => d.hcTextTotal)
            .enter()
            .append("text")
            .text((d) => d.text)
            .attr("x", this.settings.hcTotalX0)
            .attr("y", this.settings.hcTotalY)
            .attr("fill", "rgb(48, 48, 48)")
            .attr('xml:space', 'preserve')  // Preserves whitespace
            .style("text-anchor", (d) => 'start')
            .style("font-size", '2');
    }
    
    initHcGHG(config) {
        var name      = config.name;
        var nameShort = config.nameShort;
        
        this[`${nameShort}Header`] = this.svgGHeader
            .append("g")
            .attr('id', `${nameShort}-header`)
            .attr('class', `${nameShort}-group`);
        
        this[`${nameShort}HeaderTitle`] = this[`${nameShort}Header`]
            .append('g')
            .attr('id', `${nameShort}-header-title`)
            .attr('class', `${nameShort}-group font-text`)
            .append("text")
            //.text( this.settings[`${nameShort}HeaderTitle`])
            .attr("x", this.settings[`${nameShort}HeaderTitleX`])
            .attr("y", this.settings[`${nameShort}HeaderExpandY`])
            .style("alignment-baseline", 'middle')
            .style("text-anchor", (d) => 'middle')
            .style("font-size", this.settings.headerTitleFontSize)
            .on("click", () => this[`${nameShort}Expand`]());;
        
        this[`${nameShort}HeaderExpanded`] = false;
        
        this[`${nameShort}HeaderTitle`]
                .append('tspan')
                .text(this.settings[`${nameShort}HeaderTitle`] + ' ');
    
        if (config.hasExpand) {
            
            
            this[`${nameShort}HeaderTitleSymbol`] = this[`${nameShort}HeaderTitle`]
                .append('tspan')
                .attr('class', 'fas') // Font Awesome class
                .text(this.settings.hcHeaderSymbol0);
                
            //this[`${nameShort}HeaderExpand`] = this[`${nameShort}Header`]
            //    .append('g')
            //    .attr('id', `${nameShort}-header-expand`)
            //    .attr('class', `${nameShort}-group font-text`)
            //    .append("text")
            //    .text(this.settings[`${nameShort}HeaderSymbol0`])
            //    .attr("x", this.settings[`${nameShort}HeaderExpandX`])
            //    .attr("y", this.settings[`${nameShort}HeaderExpandY`])
            //    .style("alignment-baseline", 'middle')
            //    .style("text-anchor", (d) => 'end')
            //    .style("font-size", this.settings.headerExpandFontSize)
            //    .on("click", () => this[`${nameShort}Expand`]());
        }
        
        this[`${nameShort}PercentBar`] = this.rows
            .append("g")
            .attr('id', `${nameShort}-percent-bar`)
            .attr('class', `${nameShort}-group`)
            .selectAll("rect")
            .data((d) => d[`hcPercentBar${name}`])
            .enter()
            .append("rect")
            .attr("x", (d) => d.x)
            .attr("width", (d) => d.w)
            .attr("rx", this.settings.hcPercentBarRx)
            .attr("y", this.settings.hcPercentBarY)
            .attr("height", this.settings.hcPercentBarH)
            .attr("ry", this.settings.hcPercentBarRy)
            .attr("fill", this.settings[`${nameShort}PercentBarFill`])
            .attr("stroke", "none");
        
       this[`${nameShort}PercentText`] = this.rows
            .append("g")
            .attr('id', `${nameShort}-percent-text`)
            .attr('class', `${nameShort}-group font-number`)
            .selectAll("text")
            .data((d) => d[`hcTextPercent${name}`])
            .enter()
            .append("text")
            .text((d) => d.text)
            //.attr("x", (d) => d.x)
            .attr("x", (d) => this.settings[`${nameShort}PercentTextX`])
            .attr("y", (d) => 4.2 + d.yShift)
            .attr("fill", this.settings[`${nameShort}PercentTextFill`])  //this.settings.hcPercentTextFill)
            .style("opacity", this.settings.hcPercentTextO1)
            .style("text-anchor", (d) => 'end')
            .style("font-size", this.settings.hcPercentTextFontSize);
          
        this[`${nameShort}Area`] = this.rows
            .append("g")
            .attr('id', `${nameShort}-area`)
            .attr('class', `${nameShort}-group`)
            .append("path")
            .datum((d) => d[`hcArea${name}`])
            .attr("d", this.hcAreaGenerator())
            .attr("fill", "url(#hcAreaOpacityGradient)")
            //.attr("fill", "steelblue") // "rgb(134, 134, 134)")
            .attr("stroke", "rgb(98, 98, 98)")
            .attr("stroke-width", 0)
            .style("opacity", 0.6);
        
        this[`${nameShort}Total`] = this.rows
            .append("g")
            .attr('id', `${nameShort}-total`)
            .attr('class', `${nameShort}-group font-number`)
            .selectAll("text")
            .data((d) => d[`hcTextTotal${name}`])
            .enter()
            .append("text")
            .text((d) => d.text)
            .attr("x", this.settings[`${nameShort}TotalX0`])
            .attr("y", this.settings[`${nameShort}TotalY`])
            .attr("fill", "rgb(48, 48, 48)")
            .attr('xml:space', 'preserve')  // Preserves whitespace
            .style("text-anchor", (d) => 'start')
            .style("font-size", '2');
    }
    
    initLe() {
        this.leHeader = this.svgGHeader
            .append("g")
            .attr('id', 'le-header')
            .attr('class', "le-group");
        
        this.leHeaderTitle = this.leHeader
            .append('g')
            .attr('id', 'le-header-title')
            .attr('class', 'font-text')
            .append("text")
            //.text( this.settings.leHeaderTitle)
            .attr("x", this.settings.leHeaderTitleX)
            .attr("y", this.settings.leHeaderExpandY)
            .style("alignment-baseline", 'middle')
            .style("text-anchor", (d) => 'middle')
            .style("font-size", this.settings.headerTitleFontSize)
            .on("click", () => this.leExpand());
        
        this.leHeaderTitle
            .append('tspan')
            .text(this.settings.leHeaderTitle + ' ');

        this.leHeaderTitleSymbol = this.leHeaderTitle.append('tspan')
            .attr('class', 'fas') // Font Awesome class
            .text(this.settings.leHeaderSymbol0);
            
        this.leHeaderExpanded = false;
        
        // this.leHeaderExpand = this.leHeader
        //     .append('g')
        //     .attr('id', 'le-header-expand')
        //     .attr('class', 'font-text')
        //     .append("text")
        //     .text(this.settings.leHeaderSymbol0)
        //     .attr("x", this.settings.leHeaderExpandX)
        //     .attr("y", this.settings.leHeaderExpandY)
        //     .style("alignment-baseline", 'middle')
        //     .style("text-anchor", (d) => 'end')
        //     .style("font-size", this.settings.headerExpandFontSize)
        //     .on("click", () => this.leExpand());
        
        
        this.lePercentBar = this.rows
            .append("g")
            .attr('id', "le-percent-bar")
            .attr('class', "le-group")
            .selectAll("rect")
            .data((d) => d.lePercentBar)
            .enter()
            .append("rect")
            .attr("x", (d) => d.x)
            .attr("width", (d) => d.w)
            .attr("rx", this.settings.lePercentBarRx)
            .attr("y", this.settings.lePercentBarY)
            .attr("height", this.settings.lePercentBarH)
            .attr("ry", this.settings.lePercentBarRy)
            .attr("fill", this.settings.lePercentBarFill)
            .attr("stroke", "none");
        
        this.lePercentText = this.rows
            .append("g")
            .attr('id', "le-percent-text")
            .attr('class', 'le-group font-number')
            .selectAll("text")
            .data((d) => d.leTextPercent)
            .enter()
            .append("text")
            .text((d) => d.text)
            .attr("x", (d) => d.x)
            .attr("y", 4.2)
            .attr("fill", this.settings.lePercentTextFill)
            .attr("opacity", this.settings.lePercentTextO1)
            .style("text-anchor", (d) => 'end')
            .style("font-size", this.settings.lePercentTextFontSize);
            
        this.leTextTotal = this.rows
            .append("g")
            .attr('id', "le-text-total")
            .attr('class', 'le-group font-number')
            .selectAll("text")
            .data((d) => d.leTextTotal)
            .enter()
            .append("text")
            .text((d) => d.text)
            .attr("x", this.settings.leTotalX0)
            .attr("y", this.settings.leTotalY)
            .attr("fill", "rgb(48, 48, 48)")
            .attr('xml:space', 'preserve')  // Preserves whitespace
            .style("text-anchor", (d) => 'start')
            .style("font-size", '2');
        
        this.leLine = this.rows
            .append("g")
            .attr('id', "le-line")
            .attr('class', "le-group")
            .append("path")
            .datum((d) => d.leLine)
            .attr("d", this.leLineGenerator())
            .attr("fill", "none")
            .attr("stroke", "url(#hcAreaOpacityGradient)")
            //.attr("stroke", "rgb(98, 98, 98)")
            .attr("stroke-width", 0.15)
            .style("opacity", 0.6);
            
        this.leLineDot = this.rows
            .append("g")
            .attr('id', "le-line-dot")
            .attr('class', "le-group")
            .selectAll("circle")
            .data((d) => d.leLineDot)
            .enter()
            .append("circle")
            .attr("cx", (d) => d.x)
            .attr("cy", (d) => d.y)
            .attr('r', 0.22)
            .attr("fill", "darkred")
            .style("opacity", 1);
    }
    
    initLeGHG(config) {
        var name      = config.name;
        var nameShort = config.nameShort;
        
        this[`${nameShort}Header`] = this.svgGHeader
            .append("g")
            .attr('id', `${nameShort}-header`)
            .attr('class', `${nameShort}-group`);
        
        this[`${nameShort}HeaderTitle`] = this[`${nameShort}Header`]
            .append('g')
            .attr('id', `${nameShort}-header-title`)
            .attr('class', `${nameShort}-group font-text`)
            .append("text")
            //.text( this.settings[`${nameShort}HeaderTitle`])
            .attr("x", this.settings[`${nameShort}HeaderTitleX`])
            .attr("y", this.settings[`${nameShort}HeaderExpandY`])
            .style("alignment-baseline", 'middle')
            .style("text-anchor", (d) => 'middle')
            .style("font-size", this.settings.headerTitleFontSize)
            .on("click", () => this[`${nameShort}Expand`]());
        
        this[`${nameShort}HeaderExpanded`] = false;
        
        this[`${nameShort}HeaderTitle`]
                .append('tspan')
                .text(this.settings[`${nameShort}HeaderTitle`] + ' ');
    
        if (config.hasExpand) {
            
            this[`${nameShort}HeaderTitleSymbol`] = this[`${nameShort}HeaderTitle`]
                .append('tspan')
                .attr('class', 'fas') // Font Awesome class
                .text(this.settings.leHeaderSymbol0);
                
            //this[`${nameShort}HeaderExpand`] = this[`${nameShort}Header`]
            //    .append('g')
            //    .attr('id', `${nameShort}-header-expand`)
            //    .attr('class', `${nameShort}-group font-text`)
            //    .append("text")
            //    .text(this.settings[`${nameShort}HeaderSymbol0`])
            //    .attr("x", this.settings[`${nameShort}HeaderExpandX`])
            //    .attr("y", this.settings[`${nameShort}HeaderExpandY`])
            //    .style("alignment-baseline", 'middle')
            //    .style("text-anchor", (d) => 'end')
            //    .style("font-size", this.settings.headerExpandFontSize)
            //    .on("click", () => this[`${nameShort}Expand`]());
        }
        
        this[`${nameShort}PercentBar`] = this.rows
            .append("g")
            .attr('id', `${nameShort}-percent-bar`)
            .attr('class', `${nameShort}-group`)
            .selectAll("rect")
            .data((d) => d[`lePercentBar${name}`])
            .enter()
            .append("rect")
            .attr("x", (d) => d.x)
            .attr("width", (d) => d.w)
            .attr("rx", this.settings.lePercentBarRx)
            .attr("y", this.settings.lePercentBarY)
            .attr("height", this.settings.lePercentBarH)
            .attr("ry", this.settings.lePercentBarRy)
            .attr("fill", this.settings[`${nameShort}PercentBarFill`])
            .attr("stroke", "none");
        
       this[`${nameShort}PercentText`] = this.rows
            .append("g")
            .attr('id', `${nameShort}-percent-text`)
            .attr('class', `${nameShort}-group font-number`)
            .selectAll("text")
            .data((d) => d[`leTextPercent${name}`])
            .enter()
            .append("text")
            .text((d) => d.text)
            //.attr("x", (d) => d.x)
            .attr("x", (d) => this.settings[`${nameShort}PercentTextX`])
            .attr("y", (d) => 4.2 + d.yShift)
            .attr("fill", this.settings[`${nameShort}PercentTextFill`])  //this.settings.lePercentTextFill)
            .style("opacity", this.settings.lePercentTextO1)
            .style("text-anchor", (d) => 'end')
            .style("font-size", this.settings.lePercentTextFontSize);
        
        this[`${nameShort}Line`] = this.rows
            .append("g")
            .attr('id', `${nameShort}-line`)
            .attr('class', `${nameShort}-group`)
            .append("path")
            .datum((d) => d[`leLine${name}`])
            .attr("d", this.leLineGenerator())
            .attr("fill", "none")
            .attr("stroke", "url(#hcAreaOpacityGradient)")
            .attr("stroke-width", 0.15)
            .style("opacity", 0.6);
            
        this[`${nameShort}LineDot`] = this.rows
            .append("g")
            .attr('id', `${nameShort}-line-dot`)
            .attr('class', `${nameShort}-group`)
            .selectAll("circle")
            .data((d) => d[`leLineDot${name}`])
            .enter()
            .append("circle")
            .attr("cx", (d) => d.x)
            .attr("cy", (d) => d.y)
            .attr('r', 0.22)
            .attr("fill", "darkred")
            .style("opacity", 1);
        
        this[`${nameShort}Total`] = this.rows
            .append("g")
            .attr('id', `${nameShort}-total`)
            .attr('class', `${nameShort}-group font-number`)
            .selectAll("text")
            .data((d) => d[`leTextTotal${name}`])
            .enter()
            .append("text")
            .text((d) => d.text)
            .attr("x", this.settings[`${nameShort}TotalX0`])
            .attr("y", this.settings[`${nameShort}TotalY`])
            .attr("fill", "rgb(48, 48, 48)")
            .attr('xml:space', 'preserve')  // Preserves whitespace
            .style("text-anchor", (d) => 'start')
            .style("font-size", '2');
    }
    
    initPc() {
        this.pcHeader = this.svgGHeader
            .append("g")
            .attr('id', 'pc-header')
            .attr('class', 'pc-group');
        
        this.pcHeaderTitle = this.pcHeader
            .append('g')
            .attr('id', 'pc-header-title')
            .attr('class', 'pc-group font-text')
            .append("text")
            .text( this.settings.pcHeaderTitle)
            .attr("x", this.settings.pcHeaderTitleX)
            .attr("y", this.settings.pcHeaderExpandY)
            .style("alignment-baseline", 'middle')
            .style("text-anchor", (d) => 'middle')
            .style("font-size", this.settings.headerTitleFontSize);
        //    .on("click", () => this.pcExpand());
        
        this.pcHeaderExpanded = false;
        
        //this.pcHeaderExpand = this.pcHeader
        //    .append('g')
        //    .attr('id', 'pc-header-expand')
        //    .attr('class', 'pc-group font-text')
        //    .append("text")
        //    .text(this.settings.pcHeaderSymbol0)
        //    .attr("x", this.settings.pcHeaderExpandX)
        //    .attr("y", this.settings.pcHeaderExpandY)
        //    .style("alignment-baseline", 'middle')
        //    .style("text-anchor", (d) => 'end')
        //    .style("font-size", this.settings.headerExpandFontSize)
        //    .on("click", () => this.pcExpand());
        
        this.pcBars = this.rows
            .append("g")
            .attr('id', "pc-bars")
            .attr('class', 'pc-group')
            .selectAll("rect")
            .data((d) => d.pcBars)
            .enter()
            .append("rect")
            .attr("x", (d) => d.x)
            .attr("width", (d) => d.w)
            .attr("fill", (d) => d.fill)
            .attr("rx", this.settings.lePercentBarRx)
            .attr("y", this.settings.lePercentBarY)
            .attr("height", this.settings.lePercentBarH)
            .attr("ry", this.settings.lePercentBarRy)
            .attr("stroke", "none");
        
        this.pcBarsText = this.rows
            .append("g")
            .attr('id', "pc-bars-text")
            .attr('class', 'pc-group font-number') // (d) => d.pcBarsTextClass) // 
            .selectAll("text")
            .data((d) => d.pcBarsText)
            .enter()
            .append("text")
            .text((d) => d.text)
            .attr("x", this.settings.pcBarsTextX)
            .attr("y", 4.2)
            .attr("fill", (d) => d.fill)
            .attr('xml:space', 'preserve')  // Preserves whitespace
            .style("text-anchor", (d) => d.anchor)
            .style("font-size", this.settings.pcBarsTextFontSize);
        
        this.pcLine = this.rows
            .append("g")
            .attr('id', "pc-line")
            .attr('class', 'pc-group')
            .append("path")
            .datum((d) => d.pcLine)
            .attr("d", this.pcLineGenerator())
            .attr("fill", "none")
            .attr("stroke", "url(#hcAreaOpacityGradient)")
            //.attr("stroke", "rgb(98, 98, 98)")
            .attr("stroke-width", 0.15)
            .style("opacity", 0.6);
            
        this.pcLineDot = this.rows
            .append("g")
            .attr('id', "pc-line-dot")
            .attr('class', 'pc-group')
            .selectAll("circle")
            .data((d) => d.pcLineDot)
            .enter()
            .append("circle")
            .attr("cx", (d) => d.x)
            .attr("cy", (d) => d.y)
            .attr('r', 0.22)
            .attr("fill", "darkred")
            .style("opacity", 1);
        
        this.pcTotal = this.rows
            .append("g")
            .attr('id', "pc-total")
            .attr('class', 'pc-group font-number')
            .selectAll("text")
            .data((d) => d.pcTextTotal)
            .enter()
            .append("text")
            .text((d) => d.text)
            .attr("x", this.settings.pcTotalX0)
            .attr("y", this.settings.pcTotalY)
            .attr("fill", "rgb(48, 48, 48)")
            .attr('xml:space', 'preserve')  // Preserves whitespace
            .style("text-anchor", (d) => 'start')
            .style("font-size", '2');
    }

    hcAreaGenerator() { 
        return d3.area()
            .x(d => d.x)
            .y0(d => d.y0)
            .y1(d => d.y1)
            .curve(d3.curveMonotoneX);
    } 

    leLineGenerator() { 
        return d3.line()
            .x(d => d.x)
            .y(d => d.y)
            .curve(d3.curveMonotoneX);
    } 

    pcLineGenerator() { 
        return d3.line()
            .x(d => d.x)
            .y(d => d.y)
            .curve(d3.curveMonotoneX);
    } 
    
    
    hcExpand() {
      if (this.hcHeaderExpanded) {
        this.hcNHidePercentage({delay:0});
        this.hcNHide({delay:100});
        this.hcMHidePercentage({delay:200});
        this.hcMHide({delay:300});
        this.hcCHidePercentage({delay:400});
        this.hcCHide({delay:500});
        this.hcSlide({delay: 600, translateX: 0, iMult: 0, xAnchorCounterShift: 3.2, textAnchor: 'start', textOffsetX: 0});
        this.leShow({delay: 1000});
        this.pcShow({delay: 1000});
        this.hcShowPercentage({delay: 1000});
        
        this.hcHeaderTitleSymbol.text(this.settings.hcHeaderSymbol0);
      } else {
        this.leHide();
        this.pcHide();
        this.hcHidePercentage();
        this.hcSlide({delay: 400, translateX: this.settings.hcSlideInX, iMult: 10, xAnchorCounterShift: 4.8, textAnchor: 'end', textOffsetX: 8});
        this.hcCShow({delay:600});
        this.hcCShowPercentage({delay:700});
        this.hcMShow({delay:800});
        this.hcMShowPercentage({delay:900});
        this.hcNShow({delay:1000});
        this.hcNShowPercentage({delay:1100});
        
        this.hcHeaderTitleSymbol.text(this.settings.hcHeaderSymbol1);
      }
      this.hcHeaderExpanded = !this.hcHeaderExpanded; 
    }
    
    hcCExpand() {
      if (this.hcCHeaderExpanded) {
        this.hcCtHidePercentage({delay:0});
        this.hcClHidePercentage({delay:100});
        this.hcCgHidePercentage({delay:200});
        this.hcCoHidePercentage({delay:300});
        this.hcCcHidePercentage({delay:400});
        this.hcCtHide({delay:400});
        this.hcClHide({delay:500});
        this.hcCgHide({delay:600});
        this.hcCoHide({delay:700});
        this.hcCcHide({delay:800});
        this.hcCSlide({delay:1100, textAnchor: 'start', xAnchorCounterShift: -14.8});
        this.hcMShow({delay:1200});
        this.hcNShow({delay:1300});
        this.hcCShowPercentage({delay:1400});
        this.hcMShowPercentage({delay:1500});
        this.hcNShowPercentage({delay:1600});
        this.hcSlide({delay: 1800, translateX: this.settings.hcSlideInX, iMult: 10, xAnchorCounterShift: this.settings.hcSlideOutLeftX, textAnchor: 'end', textOffsetX: 8});
            
        this.hcCHeaderTitleSymbol.text(this.settings.hcHeaderSymbol0);
      } else {
        this.hcSlide({translateX: this.settings.hcSlideOutLeftX, iMult: 0, xAnchorCounterShift: 4.8, textAnchor: 'end', textOffsetX: this.settings.hcSlideOutLeftX});
        this.hcNHidePercentage({delay:0});
        this.hcMHidePercentage({delay:100});
        this.hcNHide({delay:400});
        this.hcMHide({delay:500});
        this.hcCHidePercentage({delay:600});
        this.hcCSlide({delay: 800, translateX: -28, iMult: 10, xAnchorCounterShift: 3.3, textAnchor: 'end', textOffsetX: -10, titleOffsetX: 7});
        this.hcCcShow({delay:1000});
        this.hcCoShow({delay:1100});
        this.hcCgShow({delay:1200});
        this.hcClShow({delay:1300});
        this.hcCtShow({delay:1400});
        this.hcCcShowPercentage({delay:1400});
        this.hcCoShowPercentage({delay:1500});
        this.hcCgShowPercentage({delay:1600});
        this.hcClShowPercentage({delay:1700});
        this.hcCtShowPercentage({delay:1800});
        
        this.hcCHeaderTitleSymbol.text(this.settings.hcHeaderSymbol1);
      }
      this.hcCHeaderExpanded = !this.hcCHeaderExpanded; 
    }
    
    hcMExpand() {
      if (this.hcMHeaderExpanded) {
        this.hcMotHidePercentage({delay:0});
        this.hcMwaHidePercentage({delay:100});
        this.hcMliHidePercentage({delay:200});
        this.hcMfeHidePercentage({delay:300});
        this.hcMfcHidePercentage({delay:400});
        this.hcMcpHidePercentage({delay:500});
        this.hcMotHide({delay:400});
        this.hcMwaHide({delay:500});
        this.hcMliHide({delay:600});
        this.hcMfeHide({delay:700});
        this.hcMfcHide({delay:800});
        this.hcMcpHide({delay:900});
        
        this.hcMSlide({delay:1100, textAnchor: 'start', xAnchorCounterShift: -36.8});
        this.hcCShow({delay:1200});
        this.hcNShow({delay:1300});
        
        this.hcMShowPercentage({delay:1400});
        this.hcCShowPercentage({delay:1500});
        this.hcNShowPercentage({delay:1600});
        this.hcSlide({delay: 1800, translateX: this.settings.hcSlideInX, iMult: 10, xAnchorCounterShift: this.settings.hcSlideOutLeftX, textAnchor: 'end', textOffsetX: 8});
            
        this.hcMHeaderTitleSymbol.text(this.settings.hcHeaderSymbol0);
      } else {
        this.hcSlide({translateX: this.settings.hcSlideOutLeftX, iMult: 0, xAnchorCounterShift: 4.8, textAnchor: 'end', textOffsetX: this.settings.hcSlideOutLeftX});
        this.hcNHidePercentage({delay:0});
        this.hcCHidePercentage({delay:100});
        this.hcNHide({delay:400});
        this.hcCHide({delay:500, translateX: -30});
        this.hcMHidePercentage({delay:600});
        this.hcMSlide({delay: 800, translateX: -50, iMult: 10, xAnchorCounterShift: 3.3, textAnchor: 'end', textOffsetX: -32, titleOffsetX: 7});
        this.hcMcpShow({delay:1000});
        this.hcMfcShow({delay:1100});
        this.hcMfeShow({delay:1200});
        this.hcMliShow({delay:1300});
        this.hcMwaShow({delay:1400});
        this.hcMotShow({delay:1500});
        this.hcMcpShowPercentage({delay:1400});
        this.hcMfcShowPercentage({delay:1500});
        this.hcMfeShowPercentage({delay:1600});
        this.hcMliShowPercentage({delay:1700});
        this.hcMwaShowPercentage({delay:1800});
        this.hcMotShowPercentage({delay:1900});
        
        this.hcMHeaderTitleSymbol.text(this.settings.hcHeaderSymbol1);
      }
      this.hcMHeaderExpanded = !this.hcMHeaderExpanded; 
    }
    
    hcNExpand() {
      if (this.hcNHeaderExpanded) {
        this.hcNoHidePercentage({delay:0});
        this.hcNwHidePercentage({delay:100});
        this.hcNiHidePercentage({delay:200});
        this.hcNeHidePercentage({delay:300});
        this.hcNaHidePercentage({delay:400});
        this.hcNoHide({delay:500});
        this.hcNwHide({delay:600});
        this.hcNiHide({delay:700});
        this.hcNeHide({delay:800});
        this.hcNaHide({delay:900});
        
        this.hcNSlide({delay:1100, textAnchor: 'start', xAnchorCounterShift: -58.8});
        this.hcCShow({delay:1200});
        this.hcMShow({delay:1300});
        
        this.hcNShowPercentage({delay:1400});
        this.hcCShowPercentage({delay:1500});
        this.hcMShowPercentage({delay:1600});
        this.hcSlide({delay: 1800, translateX: this.settings.hcSlideInX, iMult: 10, xAnchorCounterShift: this.settings.hcSlideOutLeftX, textAnchor: 'end', textOffsetX: 8});
            
        this.hcNHeaderTitleSymbol.text(this.settings.hcHeaderSymbol0);
      } else {
        this.hcSlide({translateX: this.settings.hcSlideOutLeftX, iMult: 0, xAnchorCounterShift: 4.8, textAnchor: 'end', textOffsetX: this.settings.hcSlideOutLeftX});
        this.hcCHidePercentage({delay:0});
        this.hcMHidePercentage({delay:100});
        this.hcCHide({delay:400, translateX:-30});
        this.hcMHide({delay:500, translateX:-50});
        this.hcNHidePercentage({delay:600});
        this.hcNSlide({delay: 800, translateX: -72, iMult: 10, xAnchorCounterShift: 3.3, textAnchor: 'end', textOffsetX: -54, titleOffsetX: 7});
        this.hcNaShow({delay:1000});
        this.hcNeShow({delay:1100});
        this.hcNiShow({delay:1200});
        this.hcNwShow({delay:1300});
        this.hcNoShow({delay:1400});
        this.hcNaShowPercentage({delay:1500});
        this.hcNeShowPercentage({delay:1600});
        this.hcNiShowPercentage({delay:1700});
        this.hcNwShowPercentage({delay:1800});
        this.hcNoShowPercentage({delay:1900});
        
        this.hcNHeaderTitleSymbol.text(this.settings.hcHeaderSymbol1);
      }
      this.hcNHeaderExpanded = !this.hcNHeaderExpanded; 
    }
    
    leExpand() {
      if (this.leHeaderExpanded) {
        // Collapse
        this.leNHidePercentage({delay:0});
        this.leNHide({delay:100});
        this.leMHidePercentage({delay:200});
        this.leMHide({delay:300});
        this.leCHidePercentage({delay:400});
        this.leCHide({delay:500});
        this.leSlide({delay: 600, translateX: 0, iMult: 0, xAnchorCounterShift: -23, textAnchor: 'start', textOffsetX: 0});
        this.hcShow({delay: 1000});
        this.pcShow({delay: 1000});
        this.leShowPercentage({delay: 1000});
            
        this.leHeaderTitleSymbol.text(this.settings.leHeaderSymbol0);
      } else {
        // Expand
        this.hcHide({translateX: -30});
        this.pcHide();
        this.leHidePercentage();
        this.leSlide({delay: 400, translateX: this.settings.leSlideInX, iMult: 10, xAnchorCounterShift: 4.8, textAnchor: 'end', textOffsetX: -18.5});
        this.leCShow({delay:600});
        this.leCShowPercentage({delay:700});
        this.leMShow({delay:800});
        this.leMShowPercentage({delay:900});
        this.leNShow({delay:1000});
        this.leNShowPercentage({delay:1100});
        
        this.leHeaderTitleSymbol.text(this.settings.leHeaderSymbol1);
      }
      this.leHeaderExpanded = !this.leHeaderExpanded; 
    }
    
    leCExpand() {
      if (this.leCHeaderExpanded) {
        this.leCtHidePercentage({delay:0});
        this.leClHidePercentage({delay:100});
        this.leCgHidePercentage({delay:200});
        this.leCoHidePercentage({delay:300});
        this.leCcHidePercentage({delay:400});
        this.leCtHide({delay:400});
        this.leClHide({delay:500});
        this.leCgHide({delay:600});
        this.leCoHide({delay:700});
        this.leCcHide({delay:800});
        this.leCSlide({delay:1100, textAnchor: 'start', xAnchorCounterShift: -14.8});
        this.leMShow({delay:1200});
        this.leNShow({delay:1300});
        this.leCShowPercentage({delay:1400});
        this.leMShowPercentage({delay:1500});
        this.leNShowPercentage({delay:1600});
        this.leSlide({delay: 1800, translateX: this.settings.leSlideInX, iMult: 10, xAnchorCounterShift: this.settings.leSlideOutLeftX, textAnchor: 'end', textOffsetX: -18.5});
            
        this.leCHeaderTitleSymbol.text(this.settings.leHeaderSymbol0);
      } else {
        this.leSlide({translateX: this.settings.leSlideOutLeftX, iMult: 0, xAnchorCounterShift: 4.8, textAnchor: 'end', textOffsetX: this.settings.leSlideOutLeftX});
        this.leNHidePercentage({delay:0});
        this.leMHidePercentage({delay:100});
        this.leNHide({delay:400});
        this.leMHide({delay:500});
        this.leCHidePercentage({delay:600});
        this.leCSlide({delay: 800, translateX: -28, iMult: 10, xAnchorCounterShift: 3.3, textAnchor: 'end', textOffsetX: -10, titleOffsetX: 7});
        this.leCcShow({delay:1000});
        this.leCoShow({delay:1100});
        this.leCgShow({delay:1200});
        this.leClShow({delay:1300});
        this.leCtShow({delay:1400});
        this.leCcShowPercentage({delay:1400});
        this.leCoShowPercentage({delay:1500});
        this.leCgShowPercentage({delay:1600});
        this.leClShowPercentage({delay:1700});
        this.leCtShowPercentage({delay:1800});
        
        this.leCHeaderTitleSymbol.text(this.settings.leHeaderSymbol1);
      }
      this.leCHeaderExpanded = !this.leCHeaderExpanded; 
    }
    
    leMExpand() {
      if (this.leMHeaderExpanded) {
        this.leMotHidePercentage({delay:0});
        this.leMwaHidePercentage({delay:100});
        this.leMliHidePercentage({delay:200});
        this.leMfeHidePercentage({delay:300});
        this.leMfcHidePercentage({delay:400});
        this.leMcpHidePercentage({delay:500});
        this.leMotHide({delay:400});
        this.leMwaHide({delay:500});
        this.leMliHide({delay:600});
        this.leMfeHide({delay:700});
        this.leMfcHide({delay:800});
        this.leMcpHide({delay:900});
        
        this.leMSlide({delay:1100, textAnchor: 'start', xAnchorCounterShift: -36.8});
        this.leCShow({delay:1200});
        this.leNShow({delay:1300});
        
        this.leMShowPercentage({delay:1400});
        this.leCShowPercentage({delay:1500});
        this.leNShowPercentage({delay:1600});
        this.leSlide({delay: 1800, translateX: this.settings.leSlideInX, iMult: 10, xAnchorCounterShift: this.settings.leSlideOutLeftX, textAnchor: 'end', textOffsetX: -18.5});
            
        this.leMHeaderTitleSymbol.text(this.settings.leHeaderSymbol0);
      } else {
        this.leSlide({translateX: this.settings.leSlideOutLeftX, iMult: 0, xAnchorCounterShift: 4.8, textAnchor: 'end', textOffsetX: this.settings.leSlideOutLeftX});
        this.leNHidePercentage({delay:0});
        this.leCHidePercentage({delay:100});
        this.leNHide({delay:400});
        this.leCHide({delay:500, translateX:-30});
        this.leMHidePercentage({delay:600});
        this.leMSlide({delay: 800, translateX: -50, iMult: 10, xAnchorCounterShift: 3.3, textAnchor: 'end', textOffsetX: -32, titleOffsetX: 7});
        this.leMcpShow({delay:1000});
        this.leMfcShow({delay:1100});
        this.leMfeShow({delay:1200});
        this.leMliShow({delay:1300});
        this.leMwaShow({delay:1400});
        this.leMotShow({delay:1500});
        this.leMcpShowPercentage({delay:1400});
        this.leMfcShowPercentage({delay:1500});
        this.leMfeShowPercentage({delay:1600});
        this.leMliShowPercentage({delay:1700});
        this.leMwaShowPercentage({delay:1800});
        this.leMotShowPercentage({delay:1900});
        
        this.leMHeaderTitleSymbol.text(this.settings.leHeaderSymbol1);
      }
      this.leMHeaderExpanded = !this.leMHeaderExpanded; 
    }
    
    leNExpand() {
      if (this.leNHeaderExpanded) {
        this.leNoHidePercentage({delay:0});
        this.leNwHidePercentage({delay:100});
        this.leNiHidePercentage({delay:200});
        this.leNeHidePercentage({delay:300});
        this.leNaHidePercentage({delay:400});
        this.leNoHide({delay:500});
        this.leNwHide({delay:600});
        this.leNiHide({delay:700});
        this.leNeHide({delay:800});
        this.leNaHide({delay:900});
        
        this.leNSlide({delay:1100, textAnchor: 'start', xAnchorCounterShift: -58.8});
        this.leCShow({delay:1200});
        this.leMShow({delay:1300});
        
        this.leNShowPercentage({delay:1400});
        this.leCShowPercentage({delay:1500});
        this.leMShowPercentage({delay:1600});
        this.leSlide({delay: 1800, translateX: this.settings.leSlideInX, iMult: 10, xAnchorCounterShift: this.settings.leSlideOutLeftX, textAnchor: 'end', textOffsetX: -18.5});
            
        this.leNHeaderTitleSymbol.text(this.settings.leHeaderSymbol0);
      } else {
        this.leSlide({translateX: this.settings.leSlideOutLeftX, iMult: 0, xAnchorCounterShift: 4.8, textAnchor: 'end', textOffsetX: this.settings.leSlideOutLeftX});
        this.leCHidePercentage({delay:0});
        this.leMHidePercentage({delay:100});
        this.leCHide({delay:400, translateX:-30});
        this.leMHide({delay:500, translateX:-50});
        this.leNHidePercentage({delay:600});
        this.leNSlide({delay: 800, translateX: -72, iMult: 10, xAnchorCounterShift: 3.3, textAnchor: 'end', textOffsetX: -54, titleOffsetX: 7});
        this.leNaShow({delay:1000});
        this.leNeShow({delay:1100});
        this.leNiShow({delay:1200});
        this.leNwShow({delay:1300});
        this.leNoShow({delay:1400});
        this.leNaShowPercentage({delay:1500});
        this.leNeShowPercentage({delay:1600});
        this.leNiShowPercentage({delay:1700});
        this.leNwShowPercentage({delay:1800});
        this.leNoShowPercentage({delay:1900});
        
        this.leNHeaderTitleSymbol.text(this.settings.leHeaderSymbol1);
      }
      this.leNHeaderExpanded = !this.leNHeaderExpanded; 
    }
    
    pcExpand() {
      if (this.pcHeaderExpanded) {
        // this.pcPercent
        //     .transition()
        //     .duration(100)
        //     .attr("opacity", 0);
        //     
        this.pcHeaderExpand.text(this.settings.pcHeaderSymbol0);
      } else {
        // this.pcPercent
        //     .transition()
        //     .duration(100)
        //     .attr("opacity", 1);
        
        this.pcHeaderExpand.text(this.settings.pcHeaderSymbol1);
      }
      this.pcHeaderExpanded = !this.pcHeaderExpanded; 
    }
    
    hcHide({duration = 400, delay = 0, translateX = 90} = {}) {
      d3.selectAll(".hc-group")
          .transition()
          .duration(duration)
          .delay(delay)
          .attr("transform", (d) => `translate(${translateX}, 0)`)
          .style("opacity", 0);
    }
    hcShow({duration = 400, delay = 0} = {}) {
      d3.selectAll(".hc-group")
          .transition()
          .duration(duration)
          .delay(delay)
          .attr("transform", d => `translate(0, 0)`)
          .style("opacity", 1);
    }
    
    hcSlide({duration = 400, delay = 0, translateX = 0, iMult = 0, xAnchorCounterShift = 0, textAnchor = 'end', textOffsetX = 0} = {}) {
      d3.selectAll("#hc-header, #hc-area")
          .transition()
          .duration(duration)
          .delay((d,i) => delay + i * iMult)
          .attr("transform", d => `translate(${translateX}, 0)`);
      
      this.hcTotal
          .attr("x", this.settings.hcTotalX0 + xAnchorCounterShift) // this is to counter the shift from text-anchor instantly
          .style("text-anchor", (d) => textAnchor)
          .transition()
          .duration(duration)
          .delay(delay)
          .attr("x", this.settings.hcTotalX0 + textOffsetX);
    }
    
    hcHidePercentage({duration = 400, delay = 0} = {}) {
      this.hcPercentBar
          .transition()
          .duration(duration)
          .delay(delay)
          .attr("width", 0);
      
      this.hcPercentText
          .transition()
          .duration(duration)
          .delay(delay)
          .style("opacity", 0);
    }
    hcShowPercentage({duration = 400, delay = 0} = {}) {
      this.hcPercentBar
          .transition()
          .duration(duration)
          .delay(delay)
          .attr("width", (d) => d.w);
        
      this.hcPercentText
          .transition()
          .duration(duration)
          .delay(delay)
          .style("opacity", this.settings.hcPercentTextO1);
    }
    
    createTransitionMethodsForHcGHG(hcGHGArray) {
        hcGHGArray.forEach(hcGHG => {
            let nameShort = hcGHG.nameShort;
            let xTranslate = hcGHG.xTranslate;

            this[`${nameShort}Hide`] = function({duration = 400, delay = 0, translateX = xTranslate} = {}) {
                d3.selectAll(`.${nameShort}-group`)
                    .transition()
                    .duration(duration)
                    .delay(delay)
                    .attr("transform", d => `translate(${translateX}, 0)`)
                    .style("opacity", 0);
            };

            this[`${nameShort}Show`] = function({duration = 400, delay = 0} = {}) {
                d3.selectAll(`.${nameShort}-group`)
                    .transition()
                    .duration(duration)
                    .delay(delay)
                    .attr("transform", d => `translate(0, 0)`)
                    .style("opacity", 1);
            };
            
            this[`${nameShort}Slide`] = function({duration = 400, delay = 0, translateX = 0, iMult = 0, xAnchorCounterShift = 0, textAnchor = 'end', textOffsetX = 0, titleOffsetX = 0} = {}) {
                d3.selectAll(`#${nameShort}-header, #${nameShort}-area, #${nameShort}-line, #${nameShort}-line-dot`)
                    .transition()
                    .duration(duration)
                    .delay((d,i) => delay + i * iMult)
                    .attr("transform", d => `translate(${translateX}, 0)`);
                
                this[`${nameShort}HeaderTitle`]
                    .transition()
                    .duration(duration)
                    .delay((d) => delay)
                    .attr("transform", d => `translate(${titleOffsetX}, 0)`);
                
                this[`${nameShort}Total`]
                    .transition()
                    .duration(duration)
                    .delay(delay)
                    .attr("x", this.settings[`${nameShort}TotalX0`] + xAnchorCounterShift)
                    .style("text-anchor", (d) => textAnchor)
                    .attr("x", this.settings[`${nameShort}TotalX0`] + textOffsetX);
            };
            
            this[`${nameShort}HidePercentage`] = function({duration = 400, delay = 0} = {}) {
                this[`${nameShort}PercentBar`]
                    .transition()
                    .duration(duration)
                    .delay(delay)
                    .attr("width", 0);
                
                this[`${nameShort}PercentText`]
                    .transition()
                    .duration(duration)
                    .delay(delay)
                    .style("opacity", 0);
            };

            this[`${nameShort}ShowPercentage`] = function({duration = 400, delay = 0} = {}) {
                this[`${nameShort}PercentBar`]
                    .transition()
                    .duration(duration)
                    .delay(delay)
                    .attr("width", (d) => d.w);
                
                this[`${nameShort}PercentText`]
                    .transition()
                    .duration(duration)
                    .delay(delay)
                    .style("opacity", this.settings[`${nameShort}PercentTextO1`]);
            };
        });
    }
    
    leHide({duration = 400, delay = 0, translateX = 60} = {}) {
      d3.selectAll(".le-group")
          .transition()
          .duration(duration)
          .delay(delay)
          .attr("transform", d => `translate(${translateX}, 0)`)
          .style("opacity", 0);
    }
    leShow({duration = 400, delay = 0} = {}) {
      d3.selectAll(".le-group")
          .transition()
          .duration(duration)
          .delay(delay)
          .attr("transform", d => `translate(0, 0)`)
          .style("opacity", 1);
    }
    
    leSlide({duration = 400, delay = 0, translateX = 0, iMult = 0, xAnchorCounterShift = 0, textAnchor = 'end', textOffsetX = 0} = {}) {
      d3.selectAll("#le-header, #le-line, #le-line-dot")
          .transition()
          .duration(duration)
          .delay((d,i) => delay + i * iMult)
          .attr("transform", d => `translate(${translateX}, 0)`);
      
      this.leTextTotal
          .attr("x", this.settings.leTotalX0 + xAnchorCounterShift) // this is to counter the shift from text-anchor instantly
          .style("text-anchor", (d) => textAnchor)
          .transition()
          .duration(duration)
          .delay(delay)
          .attr("x", this.settings.leTotalX0 + textOffsetX);
    }
    
    leHidePercentage({duration = 400, delay = 0} = {}) {
      this.lePercentBar
          .transition()
          .duration(duration)
          .delay(delay)
          .attr("width", 0);
      
      this.lePercentText
          .transition()
          .duration(duration)
          .delay(delay)
          .style("opacity", 0);
    }
    leShowPercentage({duration = 400, delay = 0} = {}) {
      this.lePercentBar
          .transition()
          .duration(duration)
          .delay(delay)
          .attr("width", (d) => d.w);
        
      this.lePercentText
          .transition()
          .duration(duration)
          .delay(delay)
          .style("opacity", this.settings.lePercentTextO1);
    }
    
    pcHide({duration = 400, delay = 0} = {}) {
      d3.selectAll(".pc-group")
          .transition()
          .duration(duration)
          .delay(delay)
          .attr("transform", d => `translate(60, 0)`)
          .style("opacity", 0);
    }
    pcShow({duration = 400, delay = 0} = {}) {
      d3.selectAll(".pc-group")
          .transition()
          .duration(duration)
          .delay(delay)
          .attr("transform", d => `translate(0, 0)`)
          .style("opacity", 1);
    }
}
