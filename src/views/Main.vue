<script setup lang="ts">
import { reactive, ref } from 'vue'
import type { Entry, Feeds, ListParams } from '@/services/api/feed'
import { getFeedEntries, getFeeds } from '@/services/api/feed'
import { Separator } from '@/components/ui/separator'
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import Setting from '@/components/setting/Setting.vue'

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
    <div class="w-[300px] h-full bg-gray-2 overflow-y-hidden grow-0 shrink-0 flex flex-col">
      <div class="h-[48px] shrink-0 p-2 px-4 flex gap-2 items-center">
        <Sheet>
          <SheetTrigger as-child>
            <div class="i-material-symbols-settings icon-btn text-[18px]" />
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle />
              <SheetDescription />
            </SheetHeader>
            <Setting />
          </SheetContent>
        </Sheet>
      </div>
      <Separator class="mb-2" />
      <div class="no-scrollbar grow flex flex-col overflow-y-scroll">
        <div
          v-for="feedItem in feeds" :key="feedItem.id"
          class="relative px-4 py-1 cursor-pointer"
          :class="{ 'item-selected font-bold border-l-2 b-red text-red': feedItem.id === currentFeedId }"
          @click="clickFeed(feedItem.id)"
        >
          {{ feedItem.title }}
        </div>
      </div>
    </div>
    <div class="w-[400px] py-8 px-4 bg-gray-1 grow-0 shrink-0 flex flex-col gap-3">
      <div
        v-for="entryItem in entries" :key="entryItem.id"
        class="w-full px-2 cursor-pointer truncate font-bold"
        :class="{ 'font-bold text-red': entryItem.id === currentEntry?.id }"
        @click="clickEntry(entryItem.id)"
      >
        {{ entryItem.title }}
      </div>
    </div>
    <div class="h-full p-4 grow overflow-y-scroll">
      <div v-html="currentEntry?.content" />
    </div>
  </div>
</template>

<style scoped>
.item-selected::after {
  content: "";
  position: absolute;
  width: 0;
  height: 0;
  top: calc(50% - 16px);
  left: 268px;
  border: 16px solid transparent;
  border-right: 16px solid rgb(243, 244, 246);
}
.icon-btn {
  --at-apply: text-[18px] cursor-pointer hover:text-red;
}
</style>
