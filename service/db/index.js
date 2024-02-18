import {MongoClient} from "mongodb";
import dotenv from "dotenv";
dotenv.config({path: '.env.example'});
console.log('process.env.MONGO_URL', process.env.MONGO_URL)
const client = new MongoClient(process.env.MONGO_URL);
const db = client.db()

/*
* 增加一条文档
* @param collectionName - 集合名
* @param document - 要插入的文档数据
* */
const mongoInsertOne = async (collectionName, document) => {
  try {
    const collection = db.collection(collectionName);
    const result = await collection.insertOne(document);
    return result.insertedId;
  } catch (e) {
    console.error('插入文档时出错:', e);
  }
};

/*
* 增加多条文档
* @param collectionName - 集合名
* @param query - 要插入的文档数据数组
* */
const mongoInsertMany = async (collectionName, query) => {
  try {
    const collection = db.collection(collectionName);
    const result = await collection.insertMany(query);
    return result.insertedIds;
  } catch (e) {
    console.error('批量插入文档时出错:', e);
  }
};

/*
* 删除一条文档
* @param collectionName - 集合名
* @param query - 删除条件
* */
const mongoDeleteOne = async (collectionName, query) => {
  try {
    const collection = db.collection(collectionName);
    const result = await collection.deleteOne(query);
    return result.deletedCount;
  } catch (e) {
    console.error('删除文档时出错:', e);
  }
};

/*
* 删除多条文档
* @param collectionName - 集合名
* @param query - 删除条件
* */
const mongoDeleteMany = async (collectionName, query) => {
  try {
    const collection = db.collection(collectionName);
    const result = await collection.deleteMany(query);
    return result.deletedCount;
  } catch (e) {
    console.error('批量删除文档时出错:', e);
  }
};

/*
* 修改一条文档
* @param collectionName - 集合名
* @param query - 查询条件
* @param options - 更新操作
* */
const mongoUpdateOne = async (collectionName, query, options) => {
  try {
    const collection = db.collection(collectionName);
    const result = await collection.updateOne(query, options);
    return result.modifiedCount;
  } catch (e) {
    console.error('更新文档时出错:', e);
  }
};

/*
* 修改多条文档
* @param collectionName - 集合名
* @param query - 查询条件
* @param options - 更新操作
* */
const mongoUpdateMany = async (collectionName, query, options) => {
  try {
    const collection = db.collection(collectionName);
    const result = await collection.updateMany(query, options);
    return result.modifiedCount;
  } catch (e) {
    console.error('批量更新文档时出错:', e);
  }
};

/*
* 查找一条文档
* @param collectionName - 集合名
* @param query - 查询条件
* @param projection - 返回的字段投影
* */
const mongoFindOne = async (collectionName, query, projection) => {
  try {
    const collection = db.collection(collectionName);
    return await collection.findOne(query, {projection});
  } catch (e) {
    console.error('查找文档时出错:', e);
  }
};

/*
* 查找排序文档
* @param collectionName - 集合名
* @param query - 查询条件
* @param projection - 返回的字段投影
* @param sort - 排序字段
* */
const mongoFindOneSort = async (collectionName, query, projection, sort) => {
  console.log('sort', sort)
  try {
    const collection = db.collection(collectionName);
    return await collection.find(query, {projection}).sort(sort).toArray();
  } catch (e) {
    console.error('查找文档时出错:', e);
  }
};

/*
* 查找全部文档
* @param collectionName - 集合名
* @param projection - 返回的字段投影
* */
const mongoFindAll = async (collectionName, query, projection) => {
  try {
    const collection = db.collection(collectionName);
    return await collection.find(query, {projection}).toArray();
  } catch (e) {
    console.error('查找全部文档时出错:', e);
  }
};

/*
* 分页查询
* @param collectionName - 集合名
* @param projection - 返回的字段投影
* @param page - 当前页码
* @param limit - 每页记录数
* */
const mongoPaginate = async (collectionName, query, projection, page, limit) => {
  try {
    // 计算跳过的记录数
    const startIndex = (page - 1) * limit;

    const collection = db.collection(collectionName);
    return await collection.find(query, {projection})
        .skip(startIndex)
        .limit(limit)
        .toArray();
  } catch (e) {
    console.error('查找全部文档时出错:', e);
  }
};

/*
* 查找并更新一条文档
* @param collectionName - 集合名
* @param query - 查询条件
* @param options - 更新操作
* */
const mongoFindOneAndUpdate = async (collectionName, query, options) => {
  try {
    const collection = db.collection(collectionName);
    return await collection.findOneAndUpdate(query, options, {returnDocument: 'after'});
  } catch (e) {
    console.error('查找并更新文档时出错:', e);
  }
};


/**
 * 函数说明
 * @param  flag - 操作
 * @param  collectionName - 集合名
 * @param  query - 查询条件
 * @param  projection - 返回字段
 * @param  options - 操作选项
 * @param page - 当前页码
 * @param limit - 每页数据量
 */
export const connectToDatabase = async (
    flag,
    collectionName,
    query = {},
    projection = {},
    options = {},
    page = 1,
    limit = 10
) => {
  try {
    await client.connect();
    if (flag === "增加一个") return await mongoInsertOne(collectionName, query);
    if (flag === "增加多个") return await mongoInsertMany(collectionName, query);
    if (flag === "删除一个") return await mongoDeleteOne(collectionName, query);
    if (flag === "删除多个") return await mongoDeleteMany(collectionName, query);
    if (flag === "修改一个") return await mongoUpdateOne(collectionName, query, options);
    if (flag === "修改多个") return await mongoUpdateMany(collectionName, query, options);
    if (flag === "查找一个") return await mongoFindOne(collectionName, query, projection);
    if (flag === "查找全部") return await mongoFindAll(collectionName, query, projection);
    if (flag === "查找更新") return await mongoFindOneAndUpdate(collectionName, query, options);
    if (flag === "分页查询") return await mongoPaginate(collectionName, query, projection, page, limit);
  } catch (e) {
    console.error('mongoDB操作出错:', e);
    await client.close();
  } finally {
    // await client.close();
  }
};
