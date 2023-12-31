import { Get } from '../request'

import type { FcResponse } from '../request'

export type ApiResponse<T> = Promise<[any, FcResponse<T> | undefined]>

export interface Feed {
  id: number
  user_id: number
  title: string
  site_url: string
  feed_url: string
  checked_at: string
  etag_header: string
  last_modified_header: string
  parsing_error_message: string
  parsing_error_count: number
  scraper_rules: string
  rewrite_rules: string
  crawler: boolean
  blocklist_rules: string
  keeplist_rules: string
  user_agent: string
  username: string
  password: string
  disabled: boolean
  ignore_http_cache: boolean
  fetch_via_proxy: boolean
  category: Category
  icon: Icon
}

export interface Category {
  id: number
  user_id: number
  title: string
}

export interface Icon {
  feed_id: number
  icon_id: number
}

export type Feeds = Feed[]

export interface ListParams {
  offset: number
  limit: number
  order: string
  direction: 'asc' | 'desc'
}

export interface Entry {
  id: number
  user_id: number
  feed_id: number
  title: string
  url: string
  comments_url: string
  author: string
  content: string
  hash: string
  published_at: string
  created_at: string
  status: string
  share_code: string
  starred: boolean
  reading_time: number
  enclosures: any
  feed: Feed
}

export interface EntryList {
  total: number
  entries: Entry[]
}

export function getFeeds<T = Feeds>(): ApiResponse<T> {
  return Get('/v1/feeds')
}

export function getFeedEntries<T = EntryList>(feedId: number, params: ListParams): ApiResponse<T> {
  return Get(`/v1/feeds/${feedId}/entries`, { params })
}
