<script setup lang="ts">
import { reactive, ref } from 'vue'
import type { Entry, Feeds, ListParams } from '@/services/api/feed'
import { getFeedEntries, getFeeds } from '@/services/api/feed'

const feeds = ref<Feeds>([])
const currentFeedId = ref<number>(0)
const entries = ref<Entry[]>([])
const entryListParam = reactive<ListParams>({
  offset: 0,
  limit: 10,
  order: 'id',
  direction: 'desc',
})
const currentEntry = ref<Entry>()

async function getFeedList() {
  const [_err, data] = await getFeeds()
  if (!_err && data !== undefined) {
    feeds.value = data
    if (!currentFeedId.value && feeds.value[0].id) {
      currentFeedId.value = feeds.value[0].id
      getEntryList()
    }
  }
}

async function getEntryList() {
  const [_err, data] = await getFeedEntries(currentFeedId.value, { ...entryListParam })
  if (!_err && data !== undefined) {
    entries.value = data.entries
    currentEntry.value = undefined
  }
}

async function clickFeed(feedId: number) {
  if (feedId) {
    currentFeedId.value = feedId
    await getEntryList()
  }
}

async function clickEntry(entryId: number) {
  currentEntry.value = entries.value.find((item) => {
    return item.id === entryId
  })
}

getFeedList()
</script>

<template>
  <div class="h-full w-full flex">
    <div class="w-[300px] h-full overflow-y-scroll grow-0 shrink-0 flex flex-col gap-2">
      <div
        v-for="feedItem in feeds" :key="feedItem.id"
        class="px-2 cursor-pointer"
        :class="{ 'font-bold border-l-2 b-black': feedItem.id === currentFeedId }"
        @click="clickFeed(feedItem.id)"
      >
        {{ feedItem.title }}
      </div>
    </div>
    <div class="w-[450px] grow-0 shrink-0 flex flex-col gap-2">
      <div
        v-for="entryItem in entries" :key="entryItem.id"
        class="px-2 cursor-pointer"
        :class="{ 'font-bold border-l-2 b-black': entryItem.id === currentEntry?.id }"
        @click="clickEntry(entryItem.id)"
      >
        {{ entryItem.title }}
      </div>
    </div>
    <div class="grow h-full overflow-y-scroll">
      <div v-html="currentEntry?.content" />
    </div>
  </div>
</template>

<style scoped>

</style>
