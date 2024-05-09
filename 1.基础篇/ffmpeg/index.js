// 用ffmpeg脚本需要先下载ffmpeg才能当shell使用；（类似于nvm一样需要安装下载 更改环境变量）

const { execSync } = require('child_process')

// 1.转换gif
// execSync(`ffmpeg -i test.mp4 test.gif`, { stdio: 'inherit' })

// 2.添加水印
// execSync(`ffmpeg -i test.mp4 -vf drawtext=text="LuyolG":fontsize=30:fontcolor=white:x=10:y=10 test2.mp4`, { stdio: 'inherit' })

// 3.视频裁剪
// execSync(`ffmpeg -i test.mp4 -ss 10 -to 14 test3.mp4`, { stdio: 'inherit' })

// 4.提取音频
// execSync(`ffmpeg -i test.mp4 test.mp3`, { stdio: 'inherit' })

// 5.去掉水印
execSync(`ffmpeg -i test2.mp4 -vf delogo=w=100:h=30:x=10:y=10 test4.mp4`, { stdio: 'inherit' })