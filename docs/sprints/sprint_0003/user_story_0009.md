# User Story: Image Input Component

**As a** user,  
**I want** to easily attach photos to my incident report,  
**So that** responders have visual evidence of the situation.

---

## Acceptance Criteria
- [ ] Reusable `components/form/ImageInput.tsx` created.
- [ ] Supports selecting images from library/camera.
- [ ] Displays loading state during processing.
- [ ] Shows image previews with a "Remove" button (top-right).
- [ ] Supports `multiInput` mode (array of images) and single mode.
- [ ] `ReportPhotoInput.tsx` refactored to use this new component.

## Implementation Notes
- **Library:** `expo-image-picker`
- **Props:**
    - `images: ImagePickerAsset[]`
    - `onFileChange: (images: ImagePickerAsset[]) => void`
    - `disabled?: boolean`
    - `multiInput?: boolean`
- **UI:**
    - Trigger button (styled match current placeholder).
    - Horizontal/Grid preview list.
    - Remove button (X) on overlay.
