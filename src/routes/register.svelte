<script>
    import { goto, stores } from '@sapper/app';
    import { register } from '../api.js';  // Updated to import from `auth.js`

    const { session } = stores();

    let username = '';
    let name = '';
    let password = '';
    let error = 'Password is too short (min length 6)';

    async function submit(event) {
        event.preventDefault();
        const response = await register({username, name, password});
        error = response.error;

        if (response.user) {
            $session.user = response.user;
            goto('/');
        }
    }
</script>

<svelte:head>
    <title>Sign up • BarBank</title>
</svelte:head>

<div class="auth-page">
    <div class="container page">
        <div class="row">
            <div class="col-md-6 offset-md-3 col-xs-12">
                <h1 class="text-xs-center">Sign up</h1>
                <p class="text-xs-center">
                    <a href="/login">Have an account?</a>
                </p>

                {#if error}
                    <div class="alert alert-danger" role="alert">{error}</div>
                {/if}

                <form on:submit|preventDefault={submit}>
                    <fieldset class="form-group">
                        <input class="form-control form-control-lg" type="text" required placeholder="Your Username"
                               bind:value={username}>
                    </fieldset>
                    <fieldset class="form-group">
                        <input class="form-control form-control-lg" type="text" required placeholder="Name"
                               bind:value={name}>
                    </fieldset>
                    <fieldset class="form-group">
                        <input class="form-control form-control-lg" type="password" required placeholder="Password"
                               bind:value={password}>
                        {#if password.length > 1 && password.length < 6}
                            <div class="alert alert-danger" role="alert">{error}</div>
                        {/if}
                    </fieldset>

                    <button class="btn btn-lg btn-primary pull-xs-right" disabled={password.length < 6}>
                        Sign up
                    </button>
                </form>
            </div>
        </div>
    </div>
</div>
