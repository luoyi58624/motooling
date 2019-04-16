# motooling

## 开发中 git 提交流程

```
git clone git@192.168.2.186:frontend/motooling.git
```

创建本地分支

```
git checkout -b feature1
```

本地提交

```
git add filepath
```

```
git commit -m '完成feature功能'
```

拉去线上最新代码，合并到 本地 feature1 的分支中

```
git checkout master
```

```
git pull origin master
```

```
git ckeckout feature1
```

```
git merge master feature1
```

> 此时如果没有冲突git已经自动合并提交。如果出现冲突，需要先处理冲突文件，然后 `git add filepath`, `git commit`

推送 feature1 到 gitlab

```
git push origin feature1
```

在 gitlab 上提交合并请求（pull request）


## 开始又一新功能开发...

### 拉取最新线上代码

```
git checkout master
git pull origin master
```

### 删除本地 feature1(待合并后删除，非必须，不影响后续操作)

```
git branch -d feature1
```

### 创建 feature2

```
git checkout -b feature2
```

---

## Project setup
```
yarn install
```

### Compiles and hot-reloads for development
```
yarn run serve
```

### Compiles and minifies for production
```
yarn run build
```

### Run your tests
```
yarn run test
```

### Lints and fixes files
```
yarn run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
