import React from "react";

export const CenteredRow: React.SFC<React.HTMLAttributes<{}>> = (props) => <div style={{ display: "flex", alignItems: 'center', marginTop: "5px", marginBottom: "5px", flexWrap: "wrap", ...props.style }}>{props.children}</div>