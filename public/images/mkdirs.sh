#!/bin/bash
# 生成目录

# 暂存开始时间
start=$(date +%s)

for i in {1..71}
do
    `mkdir $i`
done

echo "Dirs was created completed."
# 暂存结束时间
end=$(date +%s)

echo "Runtime: $((end-start)) seconds"