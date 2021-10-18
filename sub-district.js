const xlsx = require("node-xlsx");
const { ObjectId } = require("mongodb");
const fs = require("fs");
const readLocationXlsx = xlsx.parse("ThepExcel-Thailand-Tambon.xlsx");
const locationDetail = readLocationXlsx[1].data;

const subDistrictJson = locationDetail
  .slice(1, locationDetail.length)
  .map((data) => {
    return {
      _id: { $oid: new ObjectId() },
      subDistrictId: data[0],
      thaiName: data[1],
      engName: data[2],
      districtId: data[8],
      provinceId: data[13],
    };
  });

fs.writeFileSync("json/sub-district.json", JSON.stringify(subDistrictJson));
