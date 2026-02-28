import { NextRequest, NextResponse } from 'next/server';
import { SearchClient, Config } from "coze-coding-dev-sdk";

export async function POST(request: NextRequest) {
  try {
    const config = new Config();
    const client = new SearchClient(config);

    // 搜索更具体的 Win Sports 营养成分
    const response = await client.advancedSearch(
      "WinSports 双效能量胶 营养成分 碳水化物 钠 钾 卡路里",
      {
        count: 10,
        needSummary: true,
      }
    );

    return NextResponse.json({
      summary: response.summary,
      results: response.web_items?.map((item) => ({
        title: item.title,
        url: item.url,
        snippet: item.snippet,
        site: item.site_name,
      })) || []
    });
  } catch (error) {
    console.error('搜索失败:', error);
    return NextResponse.json(
      { error: '搜索失败' },
      { status: 500 }
    );
  }
}
