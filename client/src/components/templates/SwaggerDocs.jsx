import SwaggerUI from "swagger-ui-react";
import "swagger-ui-react/swagger-ui.css";

export default function SwaggerDocs() {
  return (
    <div className="p-5">
      <SwaggerUI url="/docs-proxy" />
    </div>
  );
}
