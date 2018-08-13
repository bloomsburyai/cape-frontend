"
" Vim
"

set nocompatible

"
" Plugins
"

filetype off
set rtp+=~/.vim/bundle/Vundle.vim
call vundle#begin()

Plugin 'VundleVim/Vundle.vim'
Plugin 'chriskempson/base16-vim'
Plugin 'posva/vim-vue'

call vundle#end()
filetype plugin indent on

"
" Leader
"

let mapleader=","
let g:mapleader=","

"
" Settings
"

" no beeps
set noerrorbells

" split vertical window right to the current windows
set splitright

" split horizontal windows below to the current window
set splitbelow

" set default encoding to UTF-8
set encoding=utf-8

" automatically save before :next, :make etc
set autowrite

" automatically reread changed files without asking me anything
set autoread

"
" Search
"

" search as characters are entered
set incsearch

" highlight matches
set hlsearch

" ignore case when searching
set ignorecase

" turn off search hightlight
nnoremap <leader><space> :nohlsearch<CR>

"
" Backup & swap
"

set noswapfile
set nobackup

"
" Ui
"

" dont't wrap lines
set nowrap

" show line numbers
set number

" show command in bottom bar
set showcmd

" show the mode in bottom bar
set showmode

" don't hightlight matching [{()}]
set noshowmatch

" redraw only when we need to
set lazyredraw

set nocursorcolumn
set nocursorline

"
" Colors
"

" enable syntax processing
syntax enable

" use molokai
" let g:molokai_original=1
"colorscheme molokai
"set t_Co=256

" use base 16
if filereadable(expand("~/.vimrc_background"))
  let base16colorspace=256
  source ~/.vimrc_background
endif

"
" Spaces & tabs
"

" number of visual spaces per TAB
set tabstop=2

" number of spaces in tab when editing
set softtabstop=2

" number of spaces for step
set shiftwidth=2

" tabs are spaces
set expandtab

" automatically remove all trailing whitespace
autocmd BufWritePre * :%s/\s\+$//e
