export const dropdownMenu = (selection, props) => {
    const {
        options
    } = props;


const option = selection.selectAll('option').data(options)
    .join('option')
    .attr('value', d => d)
    .text(d => d);

};