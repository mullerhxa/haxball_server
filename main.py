def test_fn(x:float):
    "Test function"
    return x * 4 / 3

def say_hello(s:str):
    "Test procedure"
    return "<i>Hello %s</i>" % s

def define_env(env):
    "Declare environment for jinja2 templates for markdown"

    for fn in [test_fn, say_hello]:
        env.macro(fn)

    @env.macro
    def saludar(s:str):
        return "Hola que tal" + s

    @env.macro
    def getAnotherMdFile(path:str):
        f = open(path, mode="r", encoding="utf-8")
        res:str = f.read()
        f.close()
        return res
