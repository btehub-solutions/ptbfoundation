'use client'

import { useEffect, useRef, useState } from 'react'
import { getFormspreeEndpoint } from '@/lib/public-site-config'
import { sendFormspree } from '@/lib/formspree'

type SubmissionState = 'idle' | 'sending' | 'success' | 'error'

export function useFormspree() {
  const [state, setState] = useState<SubmissionState>('idle')
  const [message, setMessage] = useState('')
  const request = useRef<AbortController | null>(null)
  const mounted = useRef(true)

  useEffect(() => {
    mounted.current = true
    return () => {
      mounted.current = false
      request.current?.abort()
    }
  }, [])

  async function submit(endpoint: string, fields: Record<string, string>): Promise<boolean> {
    const destination = getFormspreeEndpoint(endpoint)
    if (!destination || request.current) return false
    const controller = new AbortController()
    request.current = controller
    const timeout = window.setTimeout(() => controller.abort(), 15000)
    setState('sending')
    setMessage('')
    try {
      await sendFormspree(destination, fields, controller.signal)
      if (mounted.current) setState('success')
      return true
    } catch {
      if (mounted.current) {
        setState('error')
        setMessage(
          'We could not send your message. Your entries are still here. Please check your connection and try again.',
        )
      }
      return false
    } finally {
      window.clearTimeout(timeout)
      request.current = null
    }
  }

  return { state, message, submit }
}
