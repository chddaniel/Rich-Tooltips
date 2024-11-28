import './tooltip.css';
import { computePosition, autoUpdate } from '@floating-ui/dom';
import { offset, flip, shift } from '@floating-ui/dom';

// Function to check if the device is mobile
function isMobile() {
    return window.innerWidth <= 991;
}

// Function to initialize tooltip for each button
function createToolTip(button) {
    const tooltip = document.createElement('div');
    tooltip.className = 'rich-tooltip__content';
    tooltip.innerHTML = `
        <div class="rich-tooltip__content-wrapper"></div>
    `;

    const contentWrapper = tooltip.querySelector('.rich-tooltip__content-wrapper');
    button.appendChild(tooltip);

    // Extract data attributes (all optional)
    const imageSrc = button.dataset.image; // Image source URL
    const videoSrc = button.dataset.video; // Video source URL
    const textContent = button.dataset.text; // Optional text content

    let mediaElement, placeholder, textElement;

    // Add text content if `data-text` is provided
    if (textContent) {
        textElement = document.createElement('span');
        textElement.className = 'rich-tooltip__text-content';
        textElement.textContent = textContent;
        contentWrapper.appendChild(textElement); // Add text first, above media
    }

    // Add image or video content if respective data attributes are provided
    if (imageSrc || videoSrc) {
        placeholder = document.createElement('div');
        placeholder.className = 'rich-tooltip__placeholder';

        if (imageSrc) {
            mediaElement = document.createElement('img');
            mediaElement.setAttribute('data-src', imageSrc);
            mediaElement.alt = 'Tooltip image'; // Optional alt text

            // Hide placeholder only after the image is fully loaded
            mediaElement.onload = () => {
                if (placeholder) placeholder.style.display = 'none';
                mediaElement.style.display = 'block';
            };
        } else if (videoSrc) {
            mediaElement = document.createElement('video');
            mediaElement.setAttribute('data-src', videoSrc);
            mediaElement.autoplay = true;
            mediaElement.loop = true;
            mediaElement.muted = true;
            mediaElement.controls = false; // Optional controls

            // Hide placeholder only after the video is fully loaded
            mediaElement.onloadeddata = () => {
                if (placeholder) placeholder.style.display = 'none';
                mediaElement.style.display = 'block';
            };
        }

        // Add placeholder and media element to the tooltip
        contentWrapper.appendChild(placeholder); // Placeholder first
        if (mediaElement) contentWrapper.appendChild(mediaElement); // Media element after placeholder
    }

    // Function to load the media
    function loadMedia() {
        // Only set the media source if it has not been loaded yet
        if (mediaElement && mediaElement.getAttribute('data-src') && !mediaElement.src) {
            mediaElement.src = mediaElement.getAttribute('data-src'); 
        }
    }

    // Function to update the tooltip position
    function update() {
        if (isMobile()) {
            // Center the tooltip on mobile devices
            tooltip.style.position = 'fixed';
            tooltip.style.top = '50%';
            tooltip.style.left = '50%';
            tooltip.style.transform = 'translate(-50%, -50%)';
        } else {
            computePosition(button, tooltip, {
                placement: 'top', // Default placement
                middleware: [
                    offset(6),
                    flip(),
                    shift({ padding: 5 }),
                ],
            }).then(({ x, y }) => {
                Object.assign(tooltip.style, {
                    left: `${x}px`,
                    top: `${y}px`,
                });
            });
        }
    }

    // Show and hide the tooltip
    function showTooltip() {
        tooltip.classList.add('show'); // Add fade-in class
        loadMedia(); // Load media or display text when the tooltip is shown
        update();
    }

    function hideTooltip() {
        tooltip.classList.remove('show'); // Remove fade-in class
    }

    // Attach event listeners
    [
        ['mouseenter', showTooltip],
        ['mouseleave', hideTooltip],
        ['focus', showTooltip],
        ['blur', hideTooltip],
        ['click', showTooltip], // For touch devices
    ].forEach(([event, listener]) => {
        button.addEventListener(event, listener);
    });

    // Handle autoUpdate for position adjustments
    autoUpdate(button, tooltip, update);
}

// Initialize all tooltips
document.querySelectorAll('[data-tooltip]').forEach(createToolTip);
