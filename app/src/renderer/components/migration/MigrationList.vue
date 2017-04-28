<template lang="html">
    <div class="container">
        <div class="columns has-margin-top">
            <div class="column">
                <h3 class="title is-3">Migrations</h3>
            </div>
            <div class="column">
                <button class="button is-primary is-pulled-right">
                    Migrate
                </button>
            </div>
        </div>

        <table class="table table is-striped has-margin-top">
            <thead>
                <tr>
                    <th>Level</th>
                    <th>Comment</th>
                    <th>Date</th>
                    <th>Checksum</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td><strong>1</strong></td>
                    <td>Alter table user with new column token</td>
                    <td>2017-04-28 10:12:09</td>
                    <td>82b392f3594050ecefd768bfe258843b</td>
                </tr>
                <tr>
                    <td><strong>2</strong></td>
                    <td>Alter table user with new column token_expires</td>
                    <td>2017-04-28 12:12:09</td>
                    <td>82b392f3594050ecefd768bfe258843b</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
export default {
    name: 'migration-list'
}
</script>

<style lang="css">
</style>
