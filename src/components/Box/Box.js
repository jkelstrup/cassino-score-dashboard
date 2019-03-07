import React from 'react';

// Base box
const Box = (props) => {
  let inlineStyles = Object.assign(
    { display: 'flex', flexShrink: 0 },
    props.flex         && { flex: props.flex },
    props.spacebetween && { justifyContent: 'space-between' },
    props.flexend      && { justifyContent: 'flex-end' },
    props.wrap         && { flexWrap: 'wrap' },
    props.style
  );

  let { hcenter, vcenter, xcenter, ...cleanProps } = props;

  return (
    <div { ...cleanProps } style={ inlineStyles }>
      { props.children }
    </div>
  );
};


// ColBox
export const ColBox = (props) => {
  let inlineStyles = Object.assign(
    { flexDirection: 'column' },
    props.vcenter && { justifyContent: 'center' },
    props.hcenter && { alignItems: 'center' },
    props.xcenter && { alignItems: 'center', justifyContent: 'center' },
    props.style
  );

  return (
    <Box {...props } style={ inlineStyles } />
  );
};

// RowBox
export const RowBox = (props) => {
  let inlineStyles = Object.assign(
    { flexDirection: 'row' },
    props.vcenter && { alignItems: 'center' },
    props.hcenter && { justifyContent: 'center' },
    props.xcenter && { alignItems: 'center', justifyContent: 'center' },
    props.style
  );

  return (
    <Box {...props } style={ inlineStyles } />
  );
};
