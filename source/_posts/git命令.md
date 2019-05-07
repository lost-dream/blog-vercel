title: git命令
date: 2017-09-25 10:10:23
tags: [git]
categories: [git]
description: git常用命令大全
---
git常用命令大全  
---   
>本博客旨在记录常用git命令。如果希望得到更多关于git的知识，请移步到[廖雪峰的git教程](https://www.liaoxuefeng.com/wiki/0013739516305929606dd18361248578c67b8067c8c017b000)，有非常详细的教程资料。
#### 添加文件、查看状态、删除文件、提交文件、找回文件，重置修改文件
>git help &lt;command&gt; &nbsp;&nbsp;&nbsp;&nbsp; 显示command的帮助文档     
git show (commitID) &nbsp;&nbsp;&nbsp;&nbsp; 显示最近一次（某一次）提交的内容详情    
git co -- <file> &nbsp;&nbsp;&nbsp;&nbsp; 抛弃工作区某一文件的修改    
git co . &nbsp;&nbsp;&nbsp;&nbsp; 抛弃工作区修改     
git add <file> &nbsp;&nbsp;&nbsp;&nbsp; 将工作文件修改提交到本地暂存区      
git add . &nbsp;&nbsp;&nbsp;&nbsp; 将所有修改过的工作文件提交暂存区      
git rm <file> &nbsp;&nbsp;&nbsp;&nbsp; 从版本库中删除文件       
git rm <file> --cached &nbsp;&nbsp;&nbsp;&nbsp; 从版本库中删除文件，但不删除本地文件          
git reset <file> &nbsp;&nbsp;&nbsp;&nbsp; 从暂存区恢复到工作文件    
git reset -- . &nbsp;&nbsp;&nbsp;&nbsp; 从暂存区恢复到工作文件    
git reset --hard &nbsp;&nbsp;&nbsp;&nbsp; 恢复最近一次提交过的状态，即放弃上次提交后的所有本次修改      
git ci <file> git ci . git ci -a &nbsp;&nbsp;&nbsp;&nbsp; 将git add, git rm和git ci等操作都合并在一起做git ci -am "some comments"    
git ci --amend &nbsp;&nbsp;&nbsp;&nbsp; 修改最后一次提交记录        
git revert <commitID> &nbsp;&nbsp;&nbsp;&nbsp; 恢复某次提交的状态，恢复动作本身也创建次提交对象      
git revert HEAD &nbsp;&nbsp;&nbsp;&nbsp; 恢复最后一次提交的状态    
#### 查看文件diff

>git diff <file> &nbsp;&nbsp;&nbsp;&nbsp; 比较当前文件和暂存区文件差异 git diff       
git diff <id1><id2> &nbsp;&nbsp;&nbsp;&nbsp; 比较两次提交之间的差异        
git diff <branch1>..<branch2> &nbsp;&nbsp;&nbsp;&nbsp; 在两个分支之间比较     
git diff --staged &nbsp;&nbsp;&nbsp;&nbsp; 比较暂存区和版本库差异    
git diff --cached &nbsp;&nbsp;&nbsp;&nbsp; 比较暂存区和版本库差异     
git diff --stat &nbsp;&nbsp;&nbsp;&nbsp; 仅仅比较统计信息     
#### 查看提交记录
>git log git log <file> &nbsp;&nbsp;&nbsp;&nbsp; 查看该文件每次提交记录     
git log -p <file> &nbsp;&nbsp;&nbsp;&nbsp; 查看每次详细修改内容的diff      
git log -p -2 &nbsp;&nbsp;&nbsp;&nbsp; 查看最近两次详细修改内容的diff       
git log --stat &nbsp;&nbsp;&nbsp;&nbsp;查看提交统计信息     
#### Git 本地分支管理
##### 查看、切换、创建和删除分支
>git branch -r &nbsp;&nbsp;&nbsp;&nbsp; 查看远程分支    
git branch <new_branch> &nbsp;&nbsp;&nbsp;&nbsp; 创建新的分支    
git branch -v &nbsp;&nbsp;&nbsp;&nbsp; 查看各个分支最后提交信息    
git branch --merged &nbsp;&nbsp;&nbsp;&nbsp; 查看已经被合并到当前分支的分支    
git branch --no-merged &nbsp;&nbsp;&nbsp;&nbsp; 查看尚未被合并到当前分支的分支     
git checkout <branch> &nbsp;&nbsp;&nbsp;&nbsp; 切换到某个分支     
git checkout -b <new_branch> &nbsp;&nbsp;&nbsp;&nbsp; 创建新的分支，并且切换过去     
git checkout -b <new_branch> <branch> &nbsp;&nbsp;&nbsp;&nbsp; 基于branch创建新的new_branch      
git checkout commitID &nbsp;&nbsp;&nbsp;&nbsp; 把某次历史提交记录checkout出来，但无分支信息，切换到其他分支会自动删除     
git checkout commitID -b <new_branch> &nbsp;&nbsp;&nbsp;&nbsp; 把某次历史提交记录checkout出来，创建成一个分支     
git branch -d <branch> &nbsp;&nbsp;&nbsp;&nbsp; 删除某个分支     
git branch -D <branch> &nbsp;&nbsp;&nbsp;&nbsp; 强制删除某个分支 (未被合并的分支被删除的时候需要强制)      
#### 分支合并和rebase
>git merge <branch> &nbsp;&nbsp;&nbsp;&nbsp; 将branch分支合并到当前分支        
git merge origin/master --no-ff &nbsp;&nbsp;&nbsp;&nbsp; 不要Fast-Foward合并，这样可以生成merge提交      
git rebase master <branch> &nbsp;&nbsp;&nbsp;&nbsp; 将master rebase到branch，相当于： git co <branch> && git rebase master && git co master && git merge <branch>     
#### Git补丁管理(方便在多台机器上开发同步时用)
>git diff > ../sync.patch &nbsp;&nbsp;&nbsp;&nbsp; 生成补丁    
git apply ../sync.patch &nbsp;&nbsp;&nbsp;&nbsp; 打补丁     
git apply --check ../sync.patch &nbsp;&nbsp;&nbsp;&nbsp;测试补丁能否成功     
#### Git暂存管理
>git stash &nbsp;&nbsp;&nbsp;&nbsp; 暂存      
git stash list &nbsp;&nbsp;&nbsp;&nbsp; 列出所有stash     
git stash apply &nbsp;&nbsp;&nbsp;&nbsp; 恢复暂存的内容     
git stash drop &nbsp;&nbsp;&nbsp;&nbsp; 删除暂存区      
#### Git远程分支管理
>git pull &nbsp;&nbsp;&nbsp;&nbsp; 抓取远程仓库所有分支更新并合并到本地        
git pull --no-ff &nbsp;&nbsp;&nbsp;&nbsp; 抓取远程仓库所有分支更新并合并到本地，不要快进合并       
git fetch origin &nbsp;&nbsp;&nbsp;&nbsp; 抓取远程仓库更新        
git merge origin/master &nbsp;&nbsp;&nbsp;&nbsp; 将远程主分支合并到本地当前分支          
git co --track origin/branch &nbsp;&nbsp;&nbsp;&nbsp; 跟踪某个远程分支创建相应的本地分支         
git co -b <local_branch> origin/<remote_branch> &nbsp;&nbsp;&nbsp;&nbsp; 基于远程分支创建本地分支，功能同上        
git push &nbsp;&nbsp;&nbsp;&nbsp; push所有分支            
git push origin master &nbsp;&nbsp;&nbsp;&nbsp; 将本地主分支推到远程主分支           
git push -u origin master &nbsp;&nbsp;&nbsp;&nbsp; 将本地主分支推到远程(如无远程主分支则创建，用于初始化远程仓库)    
git push origin <local_branch> &nbsp;&nbsp;&nbsp;&nbsp; 创建远程分支， origin是远程仓库名    
git push origin <local_branch>:<remote_branch> &nbsp;&nbsp;&nbsp;&nbsp; 创建远程分支       
git push origin :<remote_branch> &nbsp;&nbsp;&nbsp;&nbsp;先删除本地分支(git br -d <branch>)，然后再push删除远程分支
#### Git远程仓库管理
##### GitHub
>git remote -v &nbsp;&nbsp;&nbsp;&nbsp; 查看远程服务器地址和仓库名称       
git remote show origin &nbsp;&nbsp;&nbsp;&nbsp; 查看远程服务器仓库状态      
git remote add origin git@ github:####/####.git &nbsp;&nbsp;&nbsp;&nbsp; 添加远程仓库地址              
git remote set-url origin git@ github.com:####/####.git &nbsp;&nbsp;&nbsp;&nbsp; 设置远程仓库地址(用于修改远程仓库地址)     
git remote rm <repository> &nbsp;&nbsp;&nbsp;&nbsp; 删除远程仓库

#### 创建远程仓库
>git clone --bare robbin_site robbin_site.git &nbsp;&nbsp;&nbsp;&nbsp; 用带版本的项目创建纯版本仓库       
scp -r my_project.git git@ git.csdn.net:~ &nbsp;&nbsp;&nbsp;&nbsp; 将纯仓库上传到服务器上       
mkdir robbin_site.git && cd robbin_site.git && git --bare init &nbsp;&nbsp;&nbsp;&nbsp; 在服务器创建纯仓库        
git remote add origin git@ github.com:robbin/robbin_site.git &nbsp;&nbsp;&nbsp;&nbsp; 设置远程仓库地址        
git push -u origin master &nbsp;&nbsp;&nbsp;&nbsp; 客户端首次提交      
git push -u origin develop &nbsp;&nbsp;&nbsp;&nbsp; 首次将本地develop分支提交到远程develop分支，并且track         
git remote set-head origin master &nbsp;&nbsp;&nbsp;&nbsp; 设置远程仓库的HEAD指向master分支        
#### 设置跟踪远程库和本地库
>git branch --set-upstream master origin/master      
git branch --set-upstream develop origin/develop