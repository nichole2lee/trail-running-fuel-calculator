import { NextRequest, NextResponse } from 'next/server';
import { SearchClient, Config } from "coze-coding-dev-sdk";

export async function POST(request: NextRequest) {
  try {
    const config = new Config();
    const client = new SearchClient(config);

    // 搜索 Win Sports 能量胶的营养信息
    const response = await client.webSearch(
      "Win Sports 能量胶 营养成分表 energy gel nutrition facts",
      10,
      true
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
