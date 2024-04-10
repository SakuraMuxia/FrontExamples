/**
 * 计算机容量单位转换
 * @params number bytes 字节数
 * @params number type  0:不转回 1:KB 2:MB 3:GB 4:TB 默认值是0
 * @return number 转换之后的结果
 */
const coverByte = (bytes,type=0) => {
    return bytes / (1024 ** type);
};
// 暴漏数据
module.exports = coverByte;