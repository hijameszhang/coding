# github

## 出错log
```
E:\github\coding>git push --set-upstream origin master
ERROR: Permission to hijameszhang/coding.git denied to jameszhang2020.
fatal: Could not read from remote repository.

Please make sure you have the correct access rights
and the repository exists.
```
## 原因
本机保存有多个github账号时，每个账号需要对应不同的ssh public key.
```
James@James-PC MINGW64 ~/.ssh
$ ls *.pub
github.pub  hellojameszhang.pub  id_rsa.pub

```
## 解决办法
### 在~/.ssh目录下添加config配置文件
```
> cd ~
> cd .ssh
> touch config
```
添加以下内容
```
Host hellojameszhang
HostName github.com
User git
IdentityFile ~/.ssh/hellojameszhang
```

### 重新添加remote仓库
::: tip 注意
远端仓库的原始地址: git@github.com:hijameszhang/coding.git
修改为: git@hellojameszhang:hijameszhang/coding.git
::: 

```
E:\github\coding>git remote rm origin

E:\github\coding>git remote add origin git@hellojameszhang:hijameszhang/coding.git

E:\github\coding>git push --set-upstream origin master
Counting objects: 42, done.
Delta compression using up to 4 threads.
Compressing objects: 100% (37/37), done.
Writing objects: 100% (42/42), 1.42 MiB | 811.00 KiB/s, done.
Total 42 (delta 2), reused 0 (delta 0)
remote: Resolving deltas: 100% (2/2), completed with 2 local objects.
To hellojameszhang:hijameszhang/coding.git
   5a6ceb6..c9fa485  master -> master
Branch master set up to track remote branch master from origin.
```