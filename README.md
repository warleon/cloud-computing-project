# cloud-computing-project

## Commit inside each submodule

```
git submodule foreach '
  git add . &&
  if ! git diff --cached --quiet; then
    git commit -m "Update submodule changes"
    git push origin main
  else
    echo "No changes in $name"
  fi
'
```

## Update submodules

```
git pull --recurse-submodules
```
