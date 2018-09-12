---
title: "Bash from scratch: learn enough bash to write your own scripts"
description: "learn enough bash to write your own scripts"
date: 2018-09-10T20:00:10-05:00
type: "single"
tags:
  - bash
  - shell
  - beginners
  - productivity
---

> Originally posted on [dev.to](https://dev.to/ahmedmusallam/bash-from-scratch-learn-enough-bash-to-write-your-own-scripts-189f)

> You should probably read [@maxwell_dev's](https://dev.to/maxwell_dev) post: [The Shell Introduction I Wish I Had](https://dev.to/maxwell_dev/the-shell-introduction-i-wish-i-had-551k) before this

I find myself always needing to write shell scripts, because they can be very handy to automate tasks. Or, most importantly, because I forget the full commands to do something and I don't want to keep looking up the docs; either because the docs suck, or I'm just lazy :)

sometimes the commands I run are long or are just unfriendly. For example, this maven command:

 
```sh
mvn clean install -PautoInstallPackage,-codeQuality,-frontend -Dcrx.user=user1 -Dcrx.password=pass1
```

this is unintuitive and I wanted something simpler like:

```sh
./install -codeQuality -frontend --user user1 --password pass1
```

or shorter:

```sh
./install -c -f -u user1 -p pass1
```

at this point you might be thinking, how is this any better than the actual maven command? Well:

1. I add documentation to my `install` script. And I print the documentation when I run `install help`
2. My scripts print the full commands they execute.
3. The command itself is part of the script, I can always look inside my script to find it.


Now that that's out of the way, lets learn some shell scripting! I'll be introducing you to a few things that'll get you writing scripts in no time!

## The basics

### Creating an executable file
In order to write a script and execute it, the script file must have execution [permission](http://linuxcommand.org/lc3_lts0090.php). So let's create a file and give it execution permission

`cd` into a test directory and run

```sh
# create a new file called `script.sh`
touch script.sh
# add `execution` permission to the script to make it executable 
chmod +x script.sh
```

to run the script, while in the same directory:

```sh
./script
```

> the `./` is necessary to tell your terminal to look in the current directory and not the default script directory.

now open that file in your favorite editor and let's get to learning the syntax.

### The [shebang](https://en.wikipedia.org/wiki/Shebang_%28Unix%29)!

TL;DR; add `#!/usr/bin/env bash` in the first line of your script file to mark that file as a bash executable.

> you *could* use `#!/usr/bin/env sh` for [portability](https://en.wikipedia.org/wiki/Shebang_(Unix)#Portability), but we are working specifically with bash here.

### printing stuff

to print things to the terminal, you can use [`echo`](http://www.linfo.org/echo.html) or [`printf`](https://linuxconfig.org/bash-printf-syntax-basics-with-examples)

`echo` is straightforward, it "echos" what you throw at it:

for example lets make that `script.sh`, from above, print "hello world"

```sh
#!/usr/bin/env bash
echo hello world
```

run it: `./script.sh` and it will print: `hello world`.

`printf` is used for printing and "formatting" strings, hence the `f` at the end. a few simple examples can be found [here](https://linuxconfig.org/bash-printf-syntax-basics-with-examples)
The largest use-case for me is printing a new line using the new line specifier `\n`.

example:

```sh
#!/usr/bin/env bash
printf "hello\nworld\n"
```

prints:

```sh
hello
world
```

### Comments

Any line starting with `#` is a comment.

### Declaring Variables

simple:

```sh
MY_VARIABLE="my value"
```
> IMPORTANT: no space before or after `=`. Shell uses space as a delimiter for command arguments.

### Parameter Expansion

> see [this](https://www.gnu.org/software/bash/manual/html_node/Shell-Parameter-Expansion.html) and [this](http://wiki.bash-hackers.org/syntax/pe) to learn more.

#### *referencing* or substituting a variable:

for example:

```sh
#!/usr/bin/env bash

FAV_FRUIT="apples"
echo FAV_FRUIT

# prints `FAV_FRUIT`
```

while:

```sh
#!/usr/bin/env bash

FAV_FRUIT="apples"
echo $FAV_FRUIT

# prints `apples`
```

did you catch the difference? yes! `FAV_FRUIT` vs `$FAV_FRUIT`.

you can also use `$` in a string:

```sh
#!/usr/bin/env bash

FAV_FRUIT="apples"
I_LIKE_BLANK="I like $FAV_FRUIT"
echo $I_LIKE_BLANK

# prints `I like apples`
```

> Note: in all examples above, you can replace `$` with `${variable name}` for the same effect. so `$FAV_FRUIT` is the same as `${FAV_FRUIT}`

> Second note: notice how we used `$FAV_FRUIT` inside of a string? that's string templating for ya!

#### Using a default value

if a variable is empty or undefined, use a certain default value. This is best illustrated with an example:

```sh
#!/usr/bin/env bash

SHIRT_COLOR=""
COLOR="${SHIRT_COLOR:-red}"
echo $color

# prints: `red` since SHIRT_COLOR is empty
```

another example:

```sh
#!/usr/bin/env bash

DEFAULT_COLOR="red"
SHIRT_COLOR=""
MY_SHIRT_COLOR="My shirt color is ${SHIRT_COLOR:-$DEFAULT_COLOR}"
echo $MY_SHIRT_COLOR


# prints: `My shirt color is red`
```

> Note: notice how we used `${SHIRT_COLOR:-$DEFAULT_COLOR}` inside of a string? that's string templating for ya!


### Passing variables to our script from terminal

To pass a variable, you can declare it before running the script.
This is especially helpful for passing environment variables. For example: the following script expects a `FRUIT` and will print `I Like <FRUIT>`. If `FRUIT` is undefined, use `Apricot`. 

```sh
#!/usr/bin/env bash

DEFAULT_FRUIT="Apricot"
FRUIT=${FRUIT:-$DEFAULT_FRUIT}
echo "I Like $FRUIT"
```

now you declare `FRUIT="Oranges"` before running `./script`:

```sh
FRUIT="Oranges" ./script
```

which prints: `I Like Oranges`

since the default is `Apricot`:

```sh
./script
```
prints: `I Like Apricot `

## The More Advanced stuff

### If Statements

#### The syntax

##### If then

```sh
if [[ <some test> ]]; then
  <commands>
fi
```

##### If else

```sh
if [[ <some test> ]]; then
  <commands>
else
  <other commands>
fi
```

##### If elseif else

```sh
if [[ <some test> ]]; then
  <commands>
elif [[ <some test> ]]; then
  <different commands>
else
  <other commands>
fi
```

#### Tests
in the above `<some test>` can be replaced with a test condition. You can see all available `test` conditions by typing `man test` in your terminal

Here are a few sample conditions that evaluate to true:

| Test                       | Description                                                                                     |
|----------------------------|-------------------------------------------------------------------------------------------------|
| `[[2 -gt 1]]`              | 2 is greater than 1. counterpart `-lt`: less,than.                                              |
| `[[2 -eq 2]]`             | 2 equals 2                                                                                      |
| `[[3 -ge 3]]`             | 3 is greater than,or equal to 3. counterpart `-le`: less than or equal                         |
| `[[-n "hello"]]`          | Length of "hello" is greater than 0                                                            |
| `[[-z ""]]`               | Length of "" is 0                                                                              |
| `[["apple"= "apple"]]`   | String,"apple" equals String "apple". (`-eq` compares numbers while `=` compares charachters) |
| `[["apple"!= "apple1"]]` | String,"apple" does no equal String "apple1"


Examples using wildcards:
    - `[[ "watermelon" = *"melon"* ]]`: String "watermelon" contains "melon"

> Since this article is about `bash` and not shell in general, we use bash's double square brackets `[[]]`. Read [this](https://www.mkssoftware.com/docs/man1/test.1.asp) and [this answer](https://stackoverflow.com/questions/2188199/how-to-use-double-or-single-brackets-parentheses-curly-braces) for more information.
	
[this article](https://linuxacademy.com/blog/linux/conditions-in-bash-scripting-if-statements/) is a good resource for further test conditions 


To continue with the spirit of examples and fruits, here is an example:

```sh
#!/usr/bin/env bash

if [[ ${#FRUIT} -gt 4 ]]    # FRUIT character count is greater than 4
then
    echo "[$FRUIT]: yay! your fruit has more than 4 characters!"
elif [[ ${#FRUIT} -lt 4  ]] # FRUIT character count is less than 4
then
    echo "[$FRUIT]: Unbelievable... your fruit has less than 4 characters..."
else                      # FRUIT character count must be 4
    echo "A fruit with exactly 4 characters, how precious!"
fi
```

The following table shows the commands and the outputs for above script:

| Command                     | Output                                                            |
|-----------------------------|-------------------------------------------------------------------|
| `FRUIT="Apple" ./script.sh` | `[Apple]: yay! your fruit has more than 4 characters!`            |
| `FRUIT="Fig" ./script.sh`   | `[Fig]: Unbelievable... your fruit has less than 4 characters...` |
| `FRUIT="Pear" ./script.sh`  | `A fruit with exactly 4 characters, how precious!`                |

> Note the parameter expansion `${#FRUIT}` gets the characters length of `FRUIT`

Here are a few helpful operators 


### Parsing Arguments (`while` and `case` statements)
This is probably going to be the best part. Now that you've learned a few cool tricks, let's look at passing arguments with some sort of API.

Our goal in this section will be to create a script that will print information about a user. For example, the following command:

```sh
./script --name Ahmed --height 6ft --occupation "Professional Procrastinator" --username coolestGuyEver23
```

which will print: 

```
Hello, my name is Ahmed. I'm 6ft tall.
I work as a Professional Procrastinator and my username is coolestGuyEver23
```

> Note that order of arguments should not matter

let's get to it!

first, we need a way to parse the arguments `--name Ahmed --height 6ft --occupation= Developer --username coolestGuyEver23` to variables. see [this SO answer](https://stackoverflow.com/questions/192249/how-do-i-parse-command-line-arguments-in-bash)

first let's look at bash's built in `$#` and `shift`
`$#` returns the number of arguments passed. for example:

```sh
#!/usr/bin/env bash

echo $#

```

If you run `./script arg1 arg2 arg3`, the output would be `3`

[`shift`](http://tldp.org/LDP/Bash-Beginners-Guide/html/sect_09_07.html)

> The shift command is one of the Bourne shell built-ins that comes with Bash. This command takes one argument, a number. The positional parameters are shifted to the left by this number, N. The positional parameters from N+1 to $# are renamed to variable names from $1 to $# - N+1.


This is better explained with an example:

```sh
#!/usr/bin/env bash

echo $#
shift 2
echo $#
shift
echo $#
echo $@
```

running `./script arg1 arg2 arg3 arg4 arg5` (total 5 arguments) prints:

```
5
3
2
arg4 arg5
```

huh? so `shift 2` basically removed `arg1` and `arg2` then we executed `shift` again and removed `arg3`. *Note that `$@`* is another builtin that prints the arguments.


Now is a good time to tell you how to access arguments sort-of like an array. You can use `$1` for first arg, `$2` for second arg, `$3` for third arg.. and so on.

example:

```sh
#!/usr/bin/env bash

echo $1
echo $3
echo $2
```

running:

```sh
./script arg1 arg2 arg3
```

prints:
```
arg1
arg3
arg2
```

how do we use all that info? take a look at this:

```sh
while [[ $# -gt 0 ]]; do
    key="$1"
    echo $key
    shift
done
```

It might have clicked by now! Using the `while` loop above, with exit condition `[[ $# -gt 0 ]]` and `shift` to reduce `$#` we can loop over all passed args!

let's make it better with a case statement, let's start simple and parse `name` and `height` only

```sh
#!/usr/bin/env bash

while [[ $# -gt 0 ]]
do
key="$1"
case $key in
    # parse name arg
    -n|--name)
        NAME="$2"   # the value is right after the key
        shift       # past argument (`--name`)
        shift       # past value
    ;;
    # parse height arg
    -h|--height)
        HEIGHT="$2"
        shift # past argument
        shift # past value
    ;;
    # unknown option
    *)
        echo "Unknown argument: $key"
        shift # past argument
    ;;
esac
done

echo "NAME: $NAME"
echo "HEIGHT: $HEIGHT"

```
> Notes:
>  
> 1. each case is separated with a pipe `|` for example `-n|--name)` matches `-n` OR `--name` 
> 2. we used `shift` two times to move past the argument flag and the argument value
> 3. More on [`case` statement](http://wiki.bash-hackers.org/syntax/ccmd/case)
> 4. We are exiting after finding the first match by using `;;`. Matching unknown options is at the bottom.

Rut it:

```sh
./run.sh --name Ahmed --height 6ft
```

or shorter

```sh
./run.sh -n Ahmed -h 6ft
```

prints:

```
NAME: Ahmed
HEIGHT: 6ft
```

putting it all together:

```sh
#!/usr/bin/env bash

while [[ $# -gt 0 ]]
do
key="$1"
case $key in
    # parse name arg
    -n|--name)
        NAME="$2"   # the value is right after the key
        shift       # past argument (`--name`)
        shift       # past value
    ;;
    # parse height arg
    -h|--height)
        HEIGHT="$2"
        shift        # past argument
        shift        # past value
    ;;
    # parse user arg
    -u|--user)
        USER="$2"
        shift # past argument
        shift # past value
    ;;
    # parse occupation argument
    -o|--occupation)
        OCCUPATION="$2"
        shift # past argument
        shift # past value
    ;;
    # parse code quality argument
    -u|--username)
        USERNAME="$2"
        shift # past argument
        shift # past value
    ;;
    # unknown option
    *)
        echo "Unknown argument: $key"
        shift # past argument
    ;;
esac
done

echo "Hello, my name is $NAME. I'm $HEIGHT tall.
I work as a $OCCUPATION and my username is $USERNAME"
```

and run it:

```sh
./run.sh --name ahmed --height 6ft --occupation "professional procrastinator" --username coolestGuyEver23
```

or

```sh
./run.sh -n ahmed -h 6ft -o "professional procrastinator" -u coolestGuyEver23
```

result:

```
Hello, my name is ahmed. I'm 6ft tall.
I work as a professional procrastinator and my username is coolestGuyEver23
```

> Note, remember [Using a default value](using-a-default-value) section above? you can use that to add default values in case a param was not passed.

### Evaluating Commands

you can assemble a a command as a string then use `eval` to execute it. For example, remember that long maven command from the beginning of the post?

```sh
mvn clean install -PautoInstallPackage -Dcrx.user=user1 -Dcrx.password=pass1
```

We can break that up and assemble it:

> Assuming I already parsed `PROFILE`, `USER` and `PASSWORD`

```sh
PROFILE="${PROFILE:-autoInstallPackage}"
USER="${USER:-user1}"
PASSWORD="${PASSWORD:-pass1}"

COMMAND="mvn clean install -P$PROFILE -Dcrx.user=$USER -Dcrx.password=$PASSWORD"

eval $COMMAND
```

and the command will be executed.

> `eval` might not be the best choice for all cases. It is completely fine in this case since I am the only one running the script and not the end users. So exercise caution when using `eval`, in any programming language.

The script above can be re-written without `eval` as:

```sh
PROFILE="${PROFILE:-autoInstallPackage}"
USER="${USER:-user1}"
PASSWORD="${PASSWORD:-pass1}"
mvn clean install "-P$PROFILE" "-Dcrx.user=$USER" "-Dcrx.password=$PASSWORD" 
```
*Thanks [@lietux](https://dev.to/lietux)*

### Functions

[Functions](http://tldp.org/LDP/abs/html/functions.html) are simple and straightforward. Here is a function that prints the first argument passed to it:

```sh
#!/usr/bin/env bash

printFirstOnly(){
  echo $1
}
# execute it
printFirstOnly hello world
```

prints `hello` only 

> Function arguments are accessed with the `$N` variable where `N` is the argument number.

I like to use functions to pretty print things:

```sh
pretty() {
  printf "***\n$1\n***\n"
}

pretty "hi there"
``` 

prints:

```
***
hi there
***
```

You can use it for whatever purpose, however.