import Image from 'next/image'

export default function ImageBlockServer({ image }: { image: any }) {
  return <Image src={image.url} alt={image.alt} height={image?.height} width={image?.width} />
}
