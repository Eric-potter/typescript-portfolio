import Link from 'next/link';
import styled from '@emotion/styled';
import tw from 'twin.macro';

import { Blog } from '..';

import type { Post } from '~/types';

interface PostProps {
	index: number;
	post: Post;
}

const Container = styled.a(tw`
	flex flex-col \
	rounded-2xl overflow-hidden hover:shadow-xl cursor-pointer \
	transform hover:-translate-y-1 \
	transition ease-in-out duration-300 \
	focus:outline-none focus:ring-4 focus:ring-offset-8 focus:ring-primary-500
`);

const Banner = styled.div`
	${tw`
		relative flex justify-center my-auto \
			w-full max-w-xl \
			overflow-hidden
	`}

	img {
		${tw`
			absolute top-0 left-0 w-full h-48 \
				object-cover select-none
		`}
	}
`;

const BannerPlaceholder = styled.div(tw`
	w-full h-full lg:h-48 \
	bg-gray-200 dark:bg-gray-600
`);

const Content = styled.div(tw`
	flex-1 flex flex-col justify-between \
	p-6 \
	bg-transparent \
	rounded-2xl lg:rounded-tr-none lg:rounded-tl-none \
	border-2 lg:border-t-0 border-gray-100 dark:border-gray-500 \
	bg-transparent
`);

const ContextText = styled.div(tw`
	flex flex-col flex-1 justify-around \
	rounded-lg \
	text-gray-300 dark:text-gray-400 \
	focus:outline-none focus:ring-4 focus:border-none focus:ring-primary-500
`);

const Title = styled.p(tw`
text-xl font-bold \
text-gray-900 dark:text-gray-100
`);

const Description = styled.p(tw`
	mt-3 \
	text-base line-clamp-2
`);

const Footer = styled.div(tw`
	flex items-start space-x-1 \
	mt-4 \
	text-sm
`);

export function _Post({ index, post }: PostProps) {
	return (
		<Link aria-label={`Read blog post: ${post.title.raw}`} href={post.url}>
			<Container>
				{post.banner.url && index <= 2 && (
					<Banner>
						<BannerPlaceholder className="animate-pulse" />
						<img
							alt={post.title.raw}
							draggable={false}
							loading="lazy"
							src={post.banner.url}
						/>
					</Banner>
				)}

				<Content>
					<ContextText>
						<Title>{post.title.raw}</Title>
						{((post.description && post.description.show) || true) && (
							<Description aria-label={post.description.raw}>
								{post.description.raw}
							</Description>
						)}
						<Footer>
							<Blog.Date date={post.date.raw} />
						</Footer>
					</ContextText>
				</Content>
			</Container>
		</Link>
	);
}
