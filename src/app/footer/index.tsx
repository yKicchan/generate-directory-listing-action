import githubWhite from "./github-mark-white.svg";
import github from "./github-mark.svg";

export function Footer() {
	return (
		<footer>
			<p>
				Powered by
				<a href="https://github.com/yKicchan/generate-directory-listing-action">
					<img data-scheme="light" src={github} alt="GitHub icon" />
					<img data-scheme="dark" src={githubWhite} alt="GitHub icon" />
					yKicchan/generate-directory-listing-action
				</a>
			</p>
		</footer>
	);
}
