<script setup lang="ts">
import { ref } from 'vue'
import { AlertCircle, Terminal } from 'lucide-vue-next'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { useProfileStore } from '@/stores'
import { getProfile } from '@/services'

const inputApiUrl = ref('')
const inputToken = ref('')
const alertContent = ref()
const alertErr = ref()

const { token, apiUrl, setApiUrl, setToken } = useProfileStore()
inputApiUrl.value = apiUrl
inputToken.value = token

async function submitSetting() {
  alertContent.value = null
  alertErr.value = null

  setApiUrl(inputApiUrl.value)
  setToken(inputToken.value)

  if (!inputApiUrl.value || !inputToken.value)
    return false

  const [_err, data] = await getProfile()
  if (!_err && data !== undefined)
    alertContent.value = data.username
  else
    alertErr.value = _err
}
</script>

<template>
  <div class="h-full w-full flex flex-col items-center justify-center gap-4">
    <Card class="w-[350px]">
      <CardHeader>
        <CardTitle>Setting</CardTitle>
        <CardDescription>Base system info.</CardDescription>
      </CardHeader>
      <CardContent>
        <form>
          <div class="grid items-center w-full gap-4">
            <div class="flex flex-col space-y-1.5">
              <Label html-for="api-url">Api Url</Label>
              <Input id="api-url" v-model="inputApiUrl" autocomplete="off" />
            </div>
            <div class="flex flex-col space-y-1.5">
              <Label html-for="token">Token</Label>
              <Input id="token" v-model="inputToken" autocomplete="off" />
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter class="flex justify-end px-6 pb-6">
        <Button @click="submitSetting">
          Submit
        </Button>
      </CardFooter>
    </Card>

    <Alert v-if="alertContent">
      <Terminal class="h-4 w-4" />
      <AlertTitle>Profile Result</AlertTitle>
      <AlertDescription>
        {{ alertContent }}
      </AlertDescription>
    </Alert>
    <Alert v-if="alertErr && !alertContent">
      <AlertCircle class="w-4 h-4" />
      <AlertTitle>Error</AlertTitle>
      <AlertDescription>
        {{ alertErr }}
      </AlertDescription>
    </Alert>
  </div>
</template>

<style scoped>

</style>
