<template>
  <div class="home" align="center">
    <Clock :unlock="unlock" @unlock="lock" />
    <v-sheet class="pa-4">
      <div class="caption">Tries: {{tries}}</div>
      <EmojiPwd :randPwd="phonePass.generatedPwd" @unlock="getUnlockValue" />
    </v-sheet>
    <v-sheet height="2vh"></v-sheet>
    <v-btn text @click="bottomSheet = !bottomSheet">Check Log</v-btn>
    <v-bottom-sheet v-model="bottomSheet" inset :scrollable="true">
      <v-card height="350px">
        <v-card-title>
          <span class="title"  v-if="end==true">Thank you for participating!</span>
          <span class="title">Log Data:</span>
          <v-btn class="overline ml-4" text @click="exportToCsv('export.csv',logData)">Export to CSV</v-btn>
        </v-card-title>
        <v-card-text>
          <ul id="log-data">
            <li v-for="(log, index) in logData" :key="index">{{log}}</li>
          </ul>
        </v-card-text>
      </v-card>
    </v-bottom-sheet>
  </div>
</template>

<script>
// @ is an alias to /src
import Clock from "@/components/Clock.vue";
import EmojiPwd from "@/components/EmojiPwd.vue";

export default {
  name: "Home",
  data: function() {
    return {
      unlock: false,
      bottomSheet: false,
      tries: 3,
      end: false
    };
  },
  components: {
    Clock,
    EmojiPwd
  },
  props: ["logData", "phonePass", "userId"],
  methods: {
    getUnlockValue(value) {
      this.unlock = value;
      if (value) {
        this.logData.push(
          `${new Date().toISOString()}` +
            ", " +
            this.userId +
            ", Phone, TEST, Login successful"
        );
        this.end = true;
        this.bottomSheet = true;
      } else {
        this.logData.push(
          `${new Date().toISOString()}` +
            ", " +
            this.userId +
            ", Phone, TEST, Login un-successful"
        );
        this.tries--;
        if (this.tries <= 0) {
          this.end = true;
          this.bottomSheet = true;
        }
      }
    },
    lock(value) {
      this.unlock = value;
    },
    exportToCsv(filename, rows) {
      var processRow = function(row) {
        var finalVal = "";
        for (var j = 0; j < row.length; j++) {
          var innerValue = row[j] === null ? "" : row[j].toString();
          if (row[j] instanceof Date) {
            innerValue = row[j].toLocaleString();
          }
          var result = innerValue.replace(/"/g, '""');
          if (result.search(/("|,|\n)/g) >= 0) result = '"' + result + '"';
          if (j > 0) finalVal += ",";
          finalVal += result;
        }
        return finalVal + "\n";
      };

      var csvFile = "";
      var logRows = [];
      for (var a = 0; a < rows.length; a++) {
        var result = rows[a].split(",");
        // console.log(result);
        logRows.push(result);
      }

      for (var i = 0; i < logRows.length; i++) {
        csvFile += processRow(logRows[i]);
      }

      var blob = new Blob([csvFile], { type: "text/csv;charset=utf-8;" });
      if (navigator.msSaveBlob) {
        // IE 10+
        navigator.msSaveBlob(blob, filename);
      } else {
        var link = document.createElement("a");
        if (link.download !== undefined) {
          // feature detection
          // Browsers that support HTML5 download attribute
          var url = URL.createObjectURL(blob);
          link.setAttribute("href", url);
          link.setAttribute("download", filename);
          link.style.visibility = "hidden";
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
        }
      }
    }
  }
};
</script>
