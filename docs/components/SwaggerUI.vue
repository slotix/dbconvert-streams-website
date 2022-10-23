<template>
  <div class="swagger" id="swagger"></div>
</template>

<script>
import SwaggerUI from "swagger-ui";
import "swagger-ui/dist/swagger-ui.css";

export default {
  name: "Swagger",
  mounted() {
    // import ("swagger-ui")
    // require  ("swagger-ui");
    // const spec = require("./api.yaml");
    SwaggerUI({
        // url: "https://stream.dbconvert.com/assets/api/api.yaml",
       // url: "https://api.dataflowkit.com/v1/swagger.yaml",
         url:"https://stream.dbconvert.com/assets/api/swagger-api.yaml",
    //   spec: spec,
      dom_id: "#swagger",
    });
  },
};
</script>
