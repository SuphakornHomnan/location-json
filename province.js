const xlsx = require("node-xlsx");
const { ObjectId } = require("mongodb");
const fs = require("fs");
const readLocationXlsx = xlsx.parse("ThepExcel-Thailand-Tambon.xlsx");
const provinceDetail = readLocationXlsx[2].data;
const summaryProvince = readLocationXlsx[3].data;

const provinceJson = provinceDetail
  .slice(1, provinceDetail.length)
  .map((province) => {
    return {
      _id: {
        $oid: new ObjectId(),
      },
      provinceId: province[0],
      thaiName: province[1],
      engName: province[2],
      region: province[3],
      isBangkok: province[6] === "ต่างจังหวัด" ? false : true,
      areaSqKiloMeter: province[7],
    };
  });

for (let i = 4; i < summaryProvince.length; i++) {
  for (let j = 0; j < provinceJson.length; j++) {
    if (provinceJson[j]["thaiName"] === summaryProvince[i][0]) {
      provinceJson[j].totalDistrict = summaryProvince[i][2];
      provinceJson[j].totalSubDistrict = summaryProvince[i][3];
    }
  }
}

fs.writeFileSync("json/province.json", JSON.stringify(provinceJson));
