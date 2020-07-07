# bootcamp

Front-end do curso **gostack11**

> [Back-end](https://github.com/nenitf/ead_js_rocketseat_gostack11-aula-backend-gobarber)

## setup

```sh
# Logo ao clonar
#npm i
yarn


# Sempre que quiser iniciar o projeto
yarn start
```

## Padrão de commit

- A uniformização dos commits é feita através de uma função criada no vim:

```vim
" script para os meus commits padrões de aula
fun! NN_GitAula()
    let log = system("git log --pretty=format:\%s")
    vnew
    put=log
    normal! gg
    if search('^:tv: add aula')>0
        normal! 3W
        let s:numero_aula = expand('<cword>')+1
        echom system("git add -A && git commit -m \":tv: add aula ".s:numero_aula."\"")
    else
        echom system("git add -A && git commit -m \":tv: add aula 1\"")
    endif
    bdelete!
endfun

" executar com:
" :call NN_GitAula()
```
