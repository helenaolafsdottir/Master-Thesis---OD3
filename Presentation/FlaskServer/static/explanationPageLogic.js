function centerSVG(svg){
    if(svg.node().getBBox().height > svg.node().getBBox().width){
        svg.style("height", '90%')
        svg.style('transform','translate(50%,5%)')
        svg.attr('x', -svg.node().getBBox().width/2)
    }else{
        svg.style("width", '90%')
    }
}

var tabList = []
var currentView

function toggleTab(view){
    
    if (!tabList.includes(view)){
        tabList.push(view)
    }
    
    currentView = view

    tab_display = d3.select('button.' + view).style('display')
    if (tab_display || tab.display == 'none'){
        d3.selectAll('.side-bar-tab').classed('w3-light-grey', false)

        d3.selectAll('div.side-bar-content-base').style('display', 'none')
        d3.selectAll('.interactive_diagram').style('display', 'none')

        d3.select('div.side-bar-content-base.' + view).style('display', 'block')
        d3.select('button.' + view).classed('w3-light-grey', true)
        d3.select('.' + view + '.interactive_diagram').style('display', 'block')
    }

    for (var i = 0; i < tabList.length; i++){
        d3.select('.interactive-diagram-tab-container').classed(tabList[i], false)
        d3.select('.side-bar-toggle').classed(tabList[i], false)
    }
    
    d3.select('.side-bar-toggle').classed(view, true)
    d3.select('.interactive-diagram-tab-container').classed(view, true)


}

function mod(n, m) {
    return ((n % m) + m) % m;
}

function previousTab(){
    if (currentView){
        index = tabList.indexOf(currentView)
        nextIndex = mod((index + 1), (tabList.length))
        toggleTab(tabList[nextIndex])
    }
}

function nextTab(){
    if(currentView){
        index = tabList.indexOf(currentView)
        previousIndex = mod((index - 1), (tabList.length))
        console.log(tabList[previousIndex] + ', ' + previousIndex + ', ' + tabList.length)
        toggleTab(tabList[previousIndex])
    }
}

function toggleVisiblityOfDescription(className){
    inner = d3.select('.title.' + className).html()
    tab_display = d3.select('div.' + className).style('display')

    if (tab_display || tab_display == 'none') {
        d3.select('.title.' + className)
        .html(inner.substring(0, inner.length-1) + '+')

        d3.select('div.' + className)
        .transition()
        .ease(d3.easeCubic)
        .style("opacity", 0)
        .style("display",'none')
        .duration(300)
        .style("max-height", "0px")
    
    } else {
        d3.select('.title.' + className)
        .html(inner.substring(0, inner.length-1) + '-')

        d3.select('div.' + className)
        .style("display", "block")
        .transition()
        .duration(300)
        .style("opacity", "1")
        .style("max-height", "20000px")

    }
}



function screen_height(){
    console.log(screen.height)
    return screen.height
}

sidebarOpen = true
function sidebarToggle(id) {
    if(sidebarOpen){
        d3.select('#' + id).transition()
        .duration(500)
        .style('transform', 'translateX(36%)')
        sidebarOpen=false
    }else{
        d3.select('#' + id)
        .transition()
        .duration(0)
        .style('display', 'block')
        .transition()
        .duration(500)
        .style('transform', 'translateX(-0%)')
        sidebarOpen=true
    }
}