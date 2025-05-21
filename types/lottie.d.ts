declare global {
  interface Window {
    lottie: {
      loadAnimation: (params: {
        container: HTMLElement
        renderer: string
        loop: boolean
        autoplay: boolean
        animationData: any
        path?: string
      }) => {
        destroy: () => void
      }
    }
  }
}

export {}
