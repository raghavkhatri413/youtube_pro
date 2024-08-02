chrome.storage.sync.get('enabled', (data) => {
    if (data.enabled) {
      console.log('YouTube Pro is enabled');
  
      let audioContext, gainNode, source;
  
      // Function to add custom buttons to YouTube player
      function addCustomButtons() {
        const playerControls = document.querySelector('.ytp-right-controls');
  
        if (playerControls && !document.querySelector('.quality-increase-button')) {
          // Quality Increase Button
          const qualityButton = document.createElement('button');
          qualityButton.innerText = 'Increase Quality';
          qualityButton.className = 'ytp-button quality-increase-button';
          qualityButton.style.marginLeft = '8px';
          qualityButton.style.backgroundColor = 'transparent';
          qualityButton.addEventListener('click', () => {
            const isActive = qualityButton.style.backgroundColor === 'red';
            qualityButton.style.backgroundColor = isActive ? 'transparent' : 'red';
            increaseQuality(!isActive);
          });
  
          // Sound Boost Button
          const soundButton = document.createElement('button');
          soundButton.innerText = 'Boost Sound';
          soundButton.className = 'ytp-button sound-boost-button';
          soundButton.style.marginLeft = '8px';
          soundButton.style.backgroundColor = 'transparent';
          soundButton.addEventListener('click', () => {
            const isActive = soundButton.style.backgroundColor === 'red';
            soundButton.style.backgroundColor = isActive ? 'transparent' : 'red';
            boostSound(!isActive);
          });
  
          playerControls.insertBefore(qualityButton, playerControls.firstChild);
          playerControls.insertBefore(soundButton, playerControls.firstChild);
        }
      }
  
      function increaseQuality(activate) {
        const video = document.querySelector('video');
        if (video) {
          if (activate) {
            video.style.filter = 'contrast(1.1) brightness(1.05) saturate(1.1)';
            console.log('Quality increased');
          } else {
            video.style.filter = 'none';
            console.log('Quality reset');
          }
        }
      }
  
      function boostSound(activate) {
        const video = document.querySelector('video');
        if (video) {
          if (activate) {
            if (!audioContext) {
              audioContext = new (window.AudioContext || window.webkitAudioContext)();
              source = audioContext.createMediaElementSource(video);
              gainNode = audioContext.createGain();
              gainNode.gain.value = 2; // Increase volume by 50%
              source.connect(gainNode);
              gainNode.connect(audioContext.destination);
              video.audioContext = audioContext;
              console.log('Sound boosted');
            } else {
              gainNode.gain.value = 2; // Re-enable volume boost
              console.log('Sound boosted');
            }
          } else {
            if (audioContext) {
              gainNode.gain.value = 1; // Reset gain to normal
              console.log('Sound reset');
            }
          }
        }
      }
  
      // Add custom buttons when the script is loaded
      addCustomButtons();
  
      // Observe changes to the YouTube player to re-add buttons if necessary
      const observer = new MutationObserver(addCustomButtons);
      observer.observe(document.body, { childList: true, subtree: true });
    } else {
      console.log('YouTube Pro is disabled');
    }
  });
  