import { Get } from '../request'

import type { FcResponse } from '../request'

export type ApiResponse<T> = Promise<[any, FcResponse<T> | undefined]>

interface ProfileResponse {
  id: number
  username: string
  is_admin: boolean
  theme: string
  language: string
  timezone: string
  entry_sorting_direction: string
  entry_sorting_order: string
  stylesheet: string
  google_id: string
  openid_connect_id: string
  entries_per_page: number
  keyboard_shortcuts: boolean
  show_reading_time: boolean
  entry_swipe: boolean
  gesture_nav: string
  last_login_at: string
  display_mode: string
  default_reading_speed: number
  cjk_reading_speed: number
  default_home_page: string
  categories_sorting_order: string
  mark_read_on_view: boolean
}

export function getProfile<T = Partial<ProfileResponse>>(): ApiResponse<T> {
  return Get('/v1/me')
}
