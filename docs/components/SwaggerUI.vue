<template>
  <div class="swagger" id="swagger"></div>
</template>

<script>
import SwaggerUI from "swagger-ui";
import "swagger-ui/dist/swagger-ui.css";

export default {
  name: "Swagger",
  mounted() {
    // const spec = require("./api.yaml");
    SwaggerUI({
        url: "https://stream.dbconvert.com/assets/api/api.yaml",
    //   spec: spec,
      dom_id: "#swagger",
    });
  },
};
</script>
