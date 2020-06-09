import styled, { css } from 'styled-components'

const sizes = {
    gutter: 12,
    grid: {
        xs: { max: 575, size: "100%", cols: 4, margin: 8 },
        sm: { min: 576, max: 767, size: "100%", cols: 8, margin: 32 },
        md: { min: 768, max: 991, size: "100%", cols: 8, margin: 32 },
        lg: { min: 992, max: 1175, size: 1080, cols: 16, margin: 48 },
        xl: { min: 1176, max: 1431, size: 1336, cols: 16, margin: 48 },
        xxl: { min: 1432, size: 1280, cols: 16, margin: 48 }
    }
};

const SIZES_DEFINITION = {
    xs: 'xs',
    sm: 'sm',
    md: 'md',
    lg: 'lg',
    xl: 'xl',
    xxl: 'xxl'
};

export const media = Object.entries(sizes.grid).reduce((acc, [size, def]) => {
    if (!def.max) {
        acc[size] = (...args) => css`
          @media (min-width: ${def.min}px) {
            ${css(...args)}
          } 
        `
    } else if (!def.min) {
        acc[size] = (...args) => css`
          @media (max-width: ${def.max}px) {
            ${css(...args)}
          } 
        `
    } else {
        acc[size] = (...args) => css`
          @media (min-width: ${def.min}px) and (max-width: ${def.max}px) {
            ${css(...args)}
          } 
        `
    }
    return acc;
}, {});

export const matchMedia = {
    isXs: () => window.matchMedia(`(max-width: ${sizes.grid.xs.max}px)`).matches,
    isSm: () => window.matchMedia(`(min-width: ${sizes.grid.sm.min}px) and (max-width: ${sizes.grid.sm.max}px)`).matches,
    isMd: () => window.matchMedia(`(min-width: ${sizes.grid.md.min}px) and (max-width: ${sizes.grid.md.max}px)`).matches,
    isLg: () => window.matchMedia(`(min-width: ${sizes.grid.lg.min}px) and (max-width: ${sizes.grid.lg.max}px)`).matches,
    isXl: () => window.matchMedia(`(min-width: ${sizes.grid.xl.min}px) and (max-width: ${sizes.grid.xl.max}px)`).matches,
    isXxl: () => window.matchMedia(`(min-width: ${sizes.grid.xxl.min}px)`).matches
};

const Container = styled.div`
    margin: 0 auto;
    
    ${ media.xs`max-width: ${sizes.grid.xs.size}px; margin: 4px;`}
    ${ media.sm`max-width: ${ sizes.grid.sm.size }px;`}
    ${ media.md`max-width: ${ sizes.grid.md.size }px;`}
    ${ media.lg`max-width: ${ sizes.grid.lg.size }px;`}
    ${ media.xl`max-width: ${ sizes.grid.xl.size }px;`}
    ${ media.xxl`max-width: ${ sizes.grid.xxl.size }px;`}
`;

const getVerticalAlignment = alignment => {
    switch(alignment) {
        case 'center': return `align-items: center`;
        case 'top': return `align-items: flex-start`;
        case 'bottom': return `align-items: flex-end`;
        case 'baseline': return `align-items: baseline`;
        default: return `align-self: stretch;`;//if no vertical align is specified, all items inherit same height
    }
};

const getHorizontalAlignment = alignment => {
    if (alignment) {
        switch(alignment) {
            case 'center': return `display: flex; justify-content: center`;
            case 'right': return `display: flex; justify-content: flex-end`;
            default: return `display: flex; justify-content: flex-start`;
        }
    }
};

const getColumnDefinition = (size, value) => {
    if (value) {
        return media[size]`
            flex: 0 0 ${100*value/sizes.grid[size].cols }%;
            max-width: ${100*value/sizes.grid[size].cols }%;   
        `;
    }
    return media[size]`
        flex-basis: 0;
        flex: 1;
        flex-grow: 1;
        max-width: 100%;   
    `;
};

const Row = styled.div.attrs(() => ({ className: 'grid-row'}))`
  display: flex;
  flex-wrap: wrap;
  
  ${props => getVerticalAlignment(props.align)};
  
  margin-top: -${4}px;
  margin-bottom: ${4}px;
  margin-left: -${sizes.gutter}px;
  margin-right: -${sizes.gutter}px;
  
  .grid-row {
    &:last-child {
      margin-bottom: 0;
    }
  }
`;

const Col = styled.div`
  margin-top: ${4}px;
  
  padding: 0 ${sizes.gutter}px;
  ${ props => getHorizontalAlignment(props.align)}; 
  
  ${ props => getColumnDefinition(SIZES_DEFINITION.xs, props.xs)};
  ${ props => getColumnDefinition(SIZES_DEFINITION.sm, props.sm)};  
  ${ props => getColumnDefinition(SIZES_DEFINITION.md, props.md)};
  ${ props => getColumnDefinition(SIZES_DEFINITION.lg, props.lg)};
  ${ props => getColumnDefinition(SIZES_DEFINITION.xl, props.xl)};
  ${ props => getColumnDefinition(SIZES_DEFINITION.xxl, props.xxl)};
`;

export default {
    Container: Container,
    Row: Row,
    Col: Col
};