import Mock from "mockjs";

import focusList from "@/mock/data/focus.json";
import todaysell from '@/mock/data/todaysell.json';
import floorList from '@/mock/data/floorList.json';
import rankList from '@/mock/data/rank.json';

// 首页轮播图后台数据
Mock.mock("http://127.0.0.1:9090/adv/focus", "get", {
    ok: 200,
    data: focusList
})

// 今日推荐数据
Mock.mock("http://127.0.0.1:9090/today/sell","get",{
    ok: 200,
    data: todaysell
})

// 楼层的数据
Mock.mock("http://127.0.0.1:9090/floorList", "get", {
    ok: 200,
    data: floorList
})

// 排行的数据
Mock.mock("http://127.0.0.1:9090/rankList", "get", {
    ok: 200,
    data: rankList
})
