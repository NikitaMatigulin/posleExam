class GameValidator {
  static validate({ title, description, price, image, user_id }) {
    if (typeof title !== "string" || title.trim().length === 0) {
      return {
        isValid: false,
        error: "Title is required and must be a non-empty string",
      };
    }

    if (typeof description !== "string" || description.trim().length === 0) {
      return {
        isValid: false,
        error: "Description is required and must be a non-empty string",
      };
    }

    if (typeof price !== "number" || price <= 0) {
      return { isValid: false, error: "Price must be a positive number" };
    }

    if (typeof image !== "string" || image.trim().length === 0) {
      return {
        isValid: false,
        error: "Image is required and must be a non-empty string",
      };
    }

    if (!user_id || isNaN(user_id) || user_id <= 0) {
      return {
        isValid: false,
        error: "User ID must be a positive number",
      };
    }

    return { isValid: true };
  }

  static validateUpdate({ title, description, price, image }) {
    if (title && (typeof title !== "string" || title.trim().length === 0)) {
      return {
        isValid: false,
        error: "Title must be a non-empty string",
      };
    }

    if (
      description &&
      (typeof description !== "string" || description.trim().length === 0)
    ) {
      return {
        isValid: false,
        error: "Description must be a non-empty string",
      };
    }

    if (price && (typeof price !== "number" || price <= 0)) {
      return { isValid: false, error: "Price must be a positive number" };
    }

    if (image && (typeof image !== "string" || image.trim().length === 0)) {
      return {
        isValid: false,
        error: "Image must be a non-empty string",
      };
    }

    return { isValid: true };
  }
}

module.exports = GameValidator;
