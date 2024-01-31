const PlayGround = resource('studio/PlayGround');
const Script = resource('studio/Script');

Script.afterUpdate(script => {
    return runScript(script);
})

PlayGround.afterUpdate(playground => {
    if (playground.run) {
        if (playground.state === 'RUNNING') {
            return
        }
        runPlayground(playground)

        playground.state = 'RUNNING'
    } else {
        if (playground.state !== 'RUNNING') {
            return
        }

        global.define(playgroundContextKey(playground), {})

        playground.state = 'NOT_STARTED'
    }

    PlayGround.update(playground)

    return playground
})


function runScript(script) {
    console.log('run', script)
    if (script.run) {
        script.run = false;
    } else {
        return;
    }

    script.output = ""
    script.error = ""
    script.state = 'RUNNING'
    Script.update(script)

    const playground = PlayGround.load(script.playground);

    if (playground.state !== 'RUNNING') {
        throw new Error('Playground is not running')
    }

    const ctx = global.get(playgroundContextKey(playground))
    try {
        const result = execute(script.content, {
            vm: ctx.vm,
        })

        script.output = JSON.stringify(result)

        script.state = 'FINISHED'
    } catch (e) {
        script.error = {
            ...e,
            message: e.message
        }
        script.state = 'FAILED'
    }
    Script.update(script)

    return script
}

function playgroundContextKey(playground) {
    return 'playground_ctx_' + playground.id;
}

function runPlayground(playground) {
    const ctx = {
        vm: initVm()
    }

    global.define(playgroundContextKey(playground), ctx)
}

// auto stop all playgrounds

const runningPlaygrounds = PlayGround.list({
    filters: {
        state: 'RUNNING'
    }
}).content

for (const playground of runningPlaygrounds) {
    playground.run = false
    PlayGround.update(playground)
}