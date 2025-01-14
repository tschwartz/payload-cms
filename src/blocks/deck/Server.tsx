import { RenderBlocks } from '@/utils/RenderBlocks'

export default function DeckBlockServer({ deck, alignment }: { deck: any; alignment?: string }) {
  return (
    <div className="container-fluid">
      <div className="card-deck" style={{ textAlign: alignment === 'yes' ? 'center' : undefined }}>
        {deck.map((card: any, index: number) => {
          const { cta, richText } = card
          return (
            <div className="card" key={index}>
              <div className="card-header bg-dark text-white p-3">{card.title}</div>
              <div className="card-body">
                <div className="card-text">
                  <RenderBlocks
                    blocks={[
                      {
                        blockType: 'richText',
                        richText: richText,
                      },
                    ]}
                  />
                </div>
                {cta?.text && cta?.url ? (
                  <div className="card-text">
                    <p>
                      <a className="btn blue-bg external-link" href={cta.url} target="_blank">
                        {cta.text}
                      </a>
                    </p>
                  </div>
                ) : null}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
