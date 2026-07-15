# 对象检查器紧凑化 · 设计核对

- Source visual truth: `/var/folders/6w/1_zdvsdn3k7bjzl16cc5rnm80000gn/T/codex-clipboard-0352afca-3984-44e2-a1fb-bc3b336b362c.png`
- Implementation: `http://192.168.3.53:18080/tools/honor-preview/index.html?verify=inspector-density-compact`
- Viewport/state: desktop；荣耀 `preview_fonts_0.jpg`，4 个文字层。

## Findings

- 无 P0/P1/P2：字号调节已改为紧凑横排；组名改为同一行；文字层由分散卡片改为连续列表；每行高度为 31px，保留原有选中态、复选框、编组与释放操作。

## Required fidelity surfaces

- Fonts and typography：沿用现有产品字体、字号与截断规则。
- Spacing and layout rhythm：字号区为 56px；列表无行间空隙；组名字段为单行；操作按钮高度为 28px。
- Colors and visual tokens：沿用现有 `--panel`、`--line`、`--accent-soft`，选中行保持浅蓝状态。
- Image quality and asset fidelity：该区域没有图像资产。
- Copy and content：保留现有“当前页字号”“文本编组”“未编组”等文案及操作名称。

## Evidence limits

浏览器环境支持 DOM 与渲染样式核对，但不支持页面截图导出；已确认实际局域网页面加载 `style.css?v=20260715-inspector-density-compact`，并核对了目标元素的计算布局。

## Final result

passed
