#variables
background_color: str = "#111"
color: str= "FFF"

#Macros
def define_env(env):
    "Declare environment for jinja2 templates for markdown"

    #for fn in [test_fn, say_hello]:
    #    env.macro(fn)

    @env.macro
    def saludar(s:str):
        return "Hola que tal" + s

    @env.macro
    def getAnotherMdFile(path:str):
        f = open(path, mode="r", encoding="utf-8")
        res:str = f.read()
        f.close()
        return res

    @env.macro
    def createDocumentationToFunction(name:str, use: str, params: list[tuple[str, str, str]], pre: list[str], post: list[str]) -> str:
        res: str = "## Function {name} \n\n### Uses: \n".format(name=name)
        res += "{use} \n\n### Params\n\n".format(use=use)

        res += "|name  |type|description| \n"
        res += "|----- |----|-------|\n"
        for i in params:
            res += "| {name} | {type} | {description} |\n".format(name=i[0], type=i[1], description=i[2]) 

        #Write the precondition
        res += "\n\n### Pre-conditions:\n\n"
        for i in pre:
            res += "* \( {pre} \)".format(pre=i)

        #Write the post-condition
        res += "\n\n### Post-conditions\n"
        for i in post:
            res += "*  \( {post} \)".format(post=i)
        return res

    @env.macro
    def createDocumentationToClass(className: str, use: str, params: list[tuple[str, str, str]]) -> str:
        res: str = "## Class {name} \n\n### Uses: \n".format(name=className)
        res += "{use} \n\n### Params\n\n".format(use=use)
        res += "|name  |type|description| \n"
        res += "|----- |----|-------|\n"
        for i in params:
            res += "| {name} | {type} | {description} |\n".format(name=i[0], type=i[1], description=i[2]) 
        
        res += "\n\n### Methods"
        return res

    @env.macro
    def createDocumentationToMethod(name:str, use: str, params: list[tuple[str, str, str]], pre: list[str], post: list[str]) -> str:
        res: str = "#### {name} \n\n##### Uses: \n".format(name=name)
        res += "{use} \n\n##### <span background-color=\"{back_color}\" color=\"{color}\" >Params </span>\n\n".format(use=use, back_color=background_color, color=color)
        res += "|name  |type|description| \n"
        res += "|----- |----|-------|\n"
        for i in params:
            res += "| {name} | {type} | {description} |\n".format(name=i[0], type=i[1], description=i[2])

        #Write the precondition
        res += "\n\n##### Pre-conditions:\n\n"
        for i in pre:
            res += "* \( {pre}  \) \n".format(pre=i)

        #Write the post-condition
        res += "\n\n##### Post-conditions\n"
        for i in post:
            res += "* \( {post} \) \n".format(post=i) 
        return res

    

