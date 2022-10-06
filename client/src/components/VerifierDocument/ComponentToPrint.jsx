import React from "react";

const pageStyle = `
  @page {
    size: 420mm 594mm;
    margin: 30mm;
  }

  @media all {
    .pagebreak {
      display: none;
    }
  }

  @media print {
    .pagebreak {
      page-break-before: always;
    }
  }
`;

// * Using a class component, everything works without issue
export class ComponentToPrint extends React.PureComponent {
  render() {
    return (
      <div>
        <style>{pageStyle}</style>
        {this.props.component}
      </div>
    );
  }
}